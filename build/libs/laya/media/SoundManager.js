import { Event } from "../events/Event";
import { AudioSound } from "./h5audio/AudioSound";
import { WebAudioSound } from "./webaudio/WebAudioSound";
//import { Loader } from "../net/Loader"
import { URL } from "../net/URL";
import { Utils } from "../utils/Utils";
import { ILaya } from "../../ILaya";
/**
 * <code>SoundManager</code> 是一个声音管理类。提供了对背景音乐、音效的播放控制方法。
 * 引擎默认有两套声音方案：WebAudio和H5Audio
 * 播放音效，优先使用WebAudio播放声音，如果WebAudio不可用，则用H5Audio播放，H5Audio在部分机器上有兼容问题（比如不能混音，播放有延迟等）。
 * 播放背景音乐，则使用H5Audio播放（使用WebAudio会增加特别大的内存，并且要等加载完毕后才能播放，有延迟）
 * 建议背景音乐用mp3类型，音效用wav或者mp3类型（如果打包为app，音效只能用wav格式）。
 * 详细教程及声音格式请参考：http://ldc2.layabox.com/doc/?nav=ch-as-1-7-0
 */
export class SoundManager {
    /**@internal */
    static __init__() {
        var win = ILaya.Browser.window;
        var supportWebAudio = win["AudioContext"] || win["webkitAudioContext"] || win["mozAudioContext"] ? true : false;
        if (supportWebAudio)
            WebAudioSound.initWebAudio();
        SoundManager._soundClass = supportWebAudio ? WebAudioSound : AudioSound;
        AudioSound._initMusicAudio();
        SoundManager._musicClass = AudioSound;
        return supportWebAudio;
    }
    /**
     * 添加播放的声音实例。
     * @param channel <code>SoundChannel</code> 对象。
     */
    static addChannel(channel) {
        if (SoundManager._channels.indexOf(channel) >= 0)
            return;
        SoundManager._channels.push(channel);
    }
    /**
     * 移除播放的声音实例。
     * @param channel <code>SoundChannel</code> 对象。
     */
    static removeChannel(channel) {
        var i;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            if (SoundManager._channels[i] == channel) {
                SoundManager._channels.splice(i, 1);
            }
        }
    }
    /**@private */
    static disposeSoundLater(url) {
        SoundManager._lastSoundUsedTimeDic[url] = ILaya.Browser.now();
        if (!SoundManager._isCheckingDispose) {
            SoundManager._isCheckingDispose = true;
            ILaya.timer.loop(5000, null, SoundManager._checkDisposeSound);
        }
    }
    /**@private */
    static _checkDisposeSound() {
        var key;
        var tTime = ILaya.Browser.now();
        var hasCheck = false;
        for (key in SoundManager._lastSoundUsedTimeDic) {
            if (tTime - SoundManager._lastSoundUsedTimeDic[key] > 30000) {
                delete SoundManager._lastSoundUsedTimeDic[key];
                SoundManager.disposeSoundIfNotUsed(key);
            }
            else {
                hasCheck = true;
            }
        }
        if (!hasCheck) {
            SoundManager._isCheckingDispose = false;
            ILaya.timer.clear(null, SoundManager._checkDisposeSound);
        }
    }
    /**@private */
    static disposeSoundIfNotUsed(url) {
        var i;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            if (SoundManager._channels[i].url == url) {
                return;
            }
        }
        SoundManager.destroySound(url);
    }
    /**
     * 失去焦点后是否自动停止背景音乐。
     * @param v Boolean 失去焦点后是否自动停止背景音乐。
     *
     */
    static set autoStopMusic(v) {
        ILaya.stage.off(Event.BLUR, null, SoundManager._stageOnBlur);
        ILaya.stage.off(Event.FOCUS, null, SoundManager._stageOnFocus);
        ILaya.stage.off(Event.VISIBILITY_CHANGE, null, SoundManager._visibilityChange);
        SoundManager._autoStopMusic = v;
        if (v) {
            ILaya.stage.on(Event.BLUR, null, SoundManager._stageOnBlur);
            ILaya.stage.on(Event.FOCUS, null, SoundManager._stageOnFocus);
            ILaya.stage.on(Event.VISIBILITY_CHANGE, null, SoundManager._visibilityChange);
        }
    }
    /**
     * 失去焦点后是否自动停止背景音乐。
     */
    static get autoStopMusic() {
        return SoundManager._autoStopMusic;
    }
    static _visibilityChange() {
        if (ILaya.stage.isVisibility) {
            SoundManager._stageOnFocus();
        }
        else {
            SoundManager._stageOnBlur();
        }
    }
    static _stageOnBlur() {
        SoundManager._isActive = false;
        if (SoundManager._musicChannel) {
            if (!SoundManager._musicChannel.isStopped) {
                SoundManager._blurPaused = true;
                SoundManager._musicChannel.pause();
            }
        }
        SoundManager.stopAllSound();
        ILaya.stage.once(Event.MOUSE_DOWN, null, SoundManager._stageOnFocus);
    }
    static _recoverWebAudio() {
        if (WebAudioSound.ctx && WebAudioSound.ctx.state != "running" && WebAudioSound.ctx.resume)
            WebAudioSound.ctx.resume();
    }
    static _stageOnFocus() {
        SoundManager._isActive = true;
        SoundManager._recoverWebAudio();
        ILaya.stage.off(Event.MOUSE_DOWN, null, SoundManager._stageOnFocus);
        if (SoundManager._blurPaused) {
            if (SoundManager._musicChannel && SoundManager._musicChannel.isStopped) {
                SoundManager._blurPaused = false;
                SoundManager._musicChannel.resume();
            }
        }
    }
    /**
     * 背景音乐和所有音效是否静音。
     */
    static set muted(value) {
        if (value == SoundManager._muted)
            return;
        if (value) {
            SoundManager.stopAllSound();
        }
        SoundManager.musicMuted = value;
        SoundManager._muted = value;
    }
    static get muted() {
        return SoundManager._muted;
    }
    /**
     * 所有音效（不包括背景音乐）是否静音。
     */
    static set soundMuted(value) {
        SoundManager._soundMuted = value;
    }
    static get soundMuted() {
        return SoundManager._soundMuted;
    }
    /**
     * 背景音乐（不包括音效）是否静音。
     */
    static set musicMuted(value) {
        if (value == SoundManager._musicMuted)
            return;
        if (value) {
            if (SoundManager._bgMusic) {
                if (SoundManager._musicChannel && !SoundManager._musicChannel.isStopped) {
                    if (ILaya.Render.isConchApp) {
                        if (SoundManager._musicChannel._audio)
                            SoundManager._musicChannel._audio.muted = true;
                        ;
                    }
                    else {
                        SoundManager._musicChannel.pause();
                    }
                }
                else {
                    SoundManager._musicChannel = null;
                }
            }
            else {
                SoundManager._musicChannel = null;
            }
            SoundManager._musicMuted = value;
        }
        else {
            SoundManager._musicMuted = value;
            if (SoundManager._bgMusic) {
                if (SoundManager._musicChannel) {
                    if (ILaya.Render.isConchApp) {
                        if (SoundManager._musicChannel._audio)
                            SoundManager._musicChannel._audio.muted = false;
                        ;
                    }
                    else {
                        SoundManager._musicChannel.resume();
                    }
                }
            }
        }
    }
    static get musicMuted() {
        return SoundManager._musicMuted;
    }
    static get useAudioMusic() {
        return SoundManager._useAudioMusic;
    }
    static set useAudioMusic(value) {
        SoundManager._useAudioMusic = value;
        if (value) {
            SoundManager._musicClass = AudioSound;
        }
        else {
            SoundManager._musicClass = null;
        }
    }
    /**
     * 播放音效。音效可以同时播放多个。
     * @param url			声音文件地址。
     * @param loops			循环次数,0表示无限循环。
     * @param complete		声音播放完成回调  Handler对象。
     * @param soundClass	使用哪个声音类进行播放，null表示自动选择。
     * @param startTime		声音播放起始时间。
     * @return SoundChannel对象，通过此对象可以对声音进行控制，以及获取声音信息。
     */
    static playSound(url, loops = 1, complete = null, soundClass = null, startTime = 0) {
        if (!SoundManager._isActive || !url)
            return null;
        if (SoundManager._muted)
            return null;
        SoundManager._recoverWebAudio();
        url = URL.formatURL(url);
        if (url == SoundManager._bgMusic) {
            if (SoundManager._musicMuted)
                return null;
        }
        else {
            if (ILaya.Render.isConchApp) {
                var ext = Utils.getFileExtension(url);
                if (ext != "wav" && ext != "ogg") {
                    alert("The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document.");
                    return null;
                }
            }
            if (SoundManager._soundMuted)
                return null;
        }
        var tSound;
        if (!ILaya.Browser.onBDMiniGame && !ILaya.Browser.onMiniGame && !ILaya.Browser.onKGMiniGame && !ILaya.Browser.onQGMiniGame && !ILaya.Browser.onVVMiniGame && !ILaya.Browser.onAlipayMiniGame && !ILaya.Browser.onQQMiniGame && !ILaya.Browser.onBLMiniGame) {
            tSound = ILaya.loader.getRes(url);
        }
        if (!soundClass)
            soundClass = SoundManager._soundClass;
        if (!tSound) {
            tSound = new soundClass();
            tSound.load(url);
            if (!ILaya.Browser.onBDMiniGame && !ILaya.Browser.onMiniGame && !ILaya.Browser.onKGMiniGame && !ILaya.Browser.onQGMiniGame && !ILaya.Browser.onVVMiniGame && !ILaya.Browser.onAlipayMiniGame && !ILaya.Browser.onQQMiniGame && !ILaya.Browser.onBLMiniGame) {
                ILaya.Loader.cacheRes(url, tSound);
            }
        }
        var channel;
        channel = tSound.play(startTime, loops);
        if (!channel)
            return null;
        channel.url = url;
        channel.volume = (url == SoundManager._bgMusic) ? SoundManager.musicVolume : SoundManager.soundVolume;
        channel.completeHandler = complete;
        return channel;
    }
    /**
     * 释放声音资源。
     * @param url	声音播放地址。
     */
    static destroySound(url) {
        var tSound = ILaya.loader.getRes(url);
        if (tSound) {
            ILaya.Loader.clearRes(url);
            tSound.dispose();
        }
    }
    /**
     * 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
     * @param url		声音文件地址。
     * @param loops		循环次数,0表示无限循环。
     * @param complete	声音播放完成回调。
     * @param startTime	声音播放起始时间。
     * @return SoundChannel对象，通过此对象可以对声音进行控制，以及获取声音信息。
     */
    static playMusic(url, loops = 0, complete = null, startTime = 0) {
        url = URL.formatURL(url);
        SoundManager._bgMusic = url;
        if (SoundManager._musicChannel)
            SoundManager._musicChannel.stop();
        return SoundManager._musicChannel = SoundManager.playSound(url, loops, complete, SoundManager._musicClass, startTime);
    }
    /**
     * 停止声音播放。此方法能够停止任意声音的播放（包括背景音乐和音效），只需传入对应的声音播放地址。
     * @param url  声音文件地址。
     */
    static stopSound(url) {
        url = URL.formatURL(url);
        var i;
        var channel;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            channel = SoundManager._channels[i];
            if (channel.url == url) {
                channel.stop();
            }
        }
    }
    /**
     * 停止播放所有声音（包括背景音乐和音效）。
     */
    static stopAll() {
        SoundManager._bgMusic = null;
        var i;
        var channel;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            channel = SoundManager._channels[i];
            channel.stop();
        }
    }
    /**
     * 停止播放所有音效（不包括背景音乐）。
     */
    static stopAllSound() {
        var i;
        var channel;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            channel = SoundManager._channels[i];
            if (channel.url != SoundManager._bgMusic) {
                channel.stop();
            }
        }
    }
    /**
     * 停止播放背景音乐（不包括音效）。
     * @param url  声音文件地址。
     */
    static stopMusic() {
        if (SoundManager._musicChannel)
            SoundManager._musicChannel.stop();
        SoundManager._bgMusic = null;
    }
    /**
     * 设置声音音量。根据参数不同，可以分别设置指定声音（背景音乐或音效）音量或者所有音效（不包括背景音乐）音量。
     * @param volume	音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
     * @param url		(default = null)声音播放地址。默认为null。为空表示设置所有音效（不包括背景音乐）的音量，不为空表示设置指定声音（背景音乐或音效）的音量。
     */
    static setSoundVolume(volume, url = null) {
        if (url) {
            url = URL.formatURL(url);
            SoundManager._setVolume(url, volume);
        }
        else {
            SoundManager.soundVolume = volume;
            var i;
            var channel;
            for (i = SoundManager._channels.length - 1; i >= 0; i--) {
                channel = SoundManager._channels[i];
                if (channel.url != SoundManager._bgMusic) {
                    channel.volume = volume;
                }
            }
        }
    }
    /**
     * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
     * @param volume	音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
     */
    static setMusicVolume(volume) {
        SoundManager.musicVolume = volume;
        SoundManager._setVolume(SoundManager._bgMusic, volume);
    }
    /**
     * 设置指定声音的音量。
     * @param url		声音文件url
     * @param volume	音量。初始值为1。
     */
    static _setVolume(url, volume) {
        url = URL.formatURL(url);
        var i;
        var channel;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            channel = SoundManager._channels[i];
            if (channel.url == url) {
                channel.volume = volume;
            }
        }
    }
}
/**
 * 背景音乐音量。
 * @default 1
 */
SoundManager.musicVolume = 1;
/**
 * 音效音量。
 * @default 1
 */
SoundManager.soundVolume = 1;
/**
 * 声音播放速率。
 * @default 1
 */
SoundManager.playbackRate = 1;
/**
 * 背景音乐使用Audio标签播放。
 * @default true
 */
SoundManager._useAudioMusic = true;
/**@private 是否静音，默认为false。*/
SoundManager._muted = false;
/**@private 是否音效静音，默认为false。*/
SoundManager._soundMuted = false;
/**@private 是否背景音乐静音，默认为false。*/
SoundManager._musicMuted = false;
/**@internal 当前背景音乐url。*/
SoundManager._bgMusic = null;
/**@private 当前背景音乐声道。*/
SoundManager._musicChannel = null;
/**@private 当前播放的Channel列表。*/
SoundManager._channels = [];
/**@private */
SoundManager._blurPaused = false;
/**@private */
SoundManager._isActive = true;
/**@private */
SoundManager._lastSoundUsedTimeDic = {};
/**@private */
SoundManager._isCheckingDispose = false;
/**
 * 音效播放后自动删除。
 * @default true
 */
SoundManager.autoReleaseSound = true;
