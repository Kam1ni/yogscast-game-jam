interface ISub {
	handler(...args:any):void;
	event:string;
	isOnce:boolean;
}

export class EventBus {
	private subs:ISub[] = [];

	public on(event:string, handler:(...args:any)=>void):void {
		this.subs.push({
			event,
			handler,
			isOnce:false
		});
	}

	public once(event:string, handler:(...args:any)=>void):void {
		this.subs.push({
			event,
			handler,
			isOnce:true
		});
	}

	public emit(event:string, ...args:any):void {
		for (let i = this.subs.length - 1; i >= 0; i--) {
			let sub = this.subs[i];
			if (sub.event == event) {
				sub.handler(...args);
				if (sub.isOnce) {
					this.subs.splice(i, 1);
				}
			}
		}
	}

	public off(event:string, handler:(...args:any)=>void):void {
		for (let i = this.subs.length - 1; i > 0; i--) {
			let sub = this.subs[i];
			if (sub.event == event) {
				if (sub.handler == handler) {
					this.subs.splice(i, 1);
				}
			}
		}
	}
}

export const eventBus = new EventBus();