import { EventDispatcher } from "../events/EventDispatcher";
/**
 * 请求进度改变时调度。
 * @eventType Event.PROGRESS
 * */
/**
 * 请求结束后调度。
 * @eventType Event.COMPLETE
 * */
/**
 * 请求出错时调度。
 * @eventType Event.ERROR
 * */
/**
 * <p> <code>HttpRequest</code> 通过封装 HTML <code>XMLHttpRequest</code> 对象提供了对 HTTP 协议的完全的访问，包括做出 POST 和 HEAD 请求以及普通的 GET 请求的能力。 <code>HttpRequest</code> 只提供以异步的形式返回 Web 服务器的响应，并且能够以文本或者二进制的形式返回内容。</p>
 * <p><b>注意：</b>建议每次请求都使用新的 <code>HttpRequest</code> 对象，因为每次调用该对象的send方法时，都会清空之前设置的数据，并重置 HTTP 请求的状态，这会导致之前还未返回响应的请求被重置，从而得不到之前请求的响应结果。</p>
 */
export declare class HttpRequest extends EventDispatcher {
    /**@private */
    protected _http: XMLHttpRequest;
    /**@private */
    private static _urlEncode;
    /**@private */
    protected _responseType: string;
    /**@private */
    protected _data: any;
    /**@private */
    protected _url: string;
    /**
     * 发送 HTTP 请求。
     * @param	url				请求的地址。大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。
     * @param	data			(default = null)发送的数据。
     * @param	method			(default = "get")用于请求的 HTTP 方法。值包括 "get"、"post"、"head"。
     * @param	responseType	(default = "text")Web 服务器的响应类型，可设置为 "text"、"json"、"xml"、"arraybuffer"。
     * @param	headers			(default = null) HTTP 请求的头部信息。参数形如key-value数组：key是头部的名称，不应该包括空白、冒号或换行；value是头部的值，不应该包括换行。比如["Content-Type", "application/json"]。
     */
    send(url: string, data?: any, method?: string, responseType?: string, headers?: any[] | null): void;
    /**
     * @private
     * 请求进度的侦听处理函数。
     * @param	e 事件对象。
     */
    protected _onProgress(e: any): void;
    /**
     * @private
     * 请求中断的侦听处理函数。
     * @param	e 事件对象。
     */
    protected _onAbort(e: any): void;
    /**
     * @private
     * 请求出错侦的听处理函数。
     * @param	e 事件对象。
     */
    protected _onError(e: any): void;
    /**
     * @private
     * 请求消息返回的侦听处理函数。
     * @param	e 事件对象。
     */
    protected _onLoad(e: any): void;
    /**
     * @private
     * 请求错误的处理函数。
     * @param	message 错误信息。
     */
    protected error(message: string): void;
    /**
     * @private
     * 请求成功完成的处理函数。
     */
    protected complete(): void;
    /**
     * @private
     * 清除当前请求。
     */
    protected clear(): void;
    /** 请求的地址。*/
    readonly url: string;
    /** 返回的数据。*/
    readonly data: any;
    /**
     * 本对象所封装的原生 XMLHttpRequest 引用。
     */
    readonly http: any;
}
