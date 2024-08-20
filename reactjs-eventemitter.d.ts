declare module 'reactjs-eventemitter' {
  type EventCallback = (...args: any[]) => void;

  export default class EventEmitter {
    // on(event: string, listener: EventCallback): this;
    // off(event: string, listener: EventCallback): this;
    // once(event: string, listener: EventCallback): this;
    // emit(event: string, ...args: any[]): boolean;
    // removeAllListeners(event?: string): this;
    // listenerCount(event: string): number;
    static dispatch(event: string, ...args: any[]): boolean;
    static subscribe(event: string, listener: EventCallback): void;
  }
}
