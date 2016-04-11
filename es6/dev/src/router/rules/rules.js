import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { Map } from 'angular2/src/facade/collection';
import { convertUrlParamsToArray } from '../url_parser';
import { ComponentInstruction } from '../instruction';
// RouteMatch objects hold information about a match between a rule and a URL
export class RouteMatch {
}
export class PathMatch extends RouteMatch {
    constructor(instruction, remaining, remainingAux) {
        super();
        this.instruction = instruction;
        this.remaining = remaining;
        this.remainingAux = remainingAux;
    }
}
export class RedirectMatch extends RouteMatch {
    constructor(redirectTo, specificity) {
        super();
        this.redirectTo = redirectTo;
        this.specificity = specificity;
    }
}
export class RedirectRule {
    constructor(_pathRecognizer, redirectTo) {
        this._pathRecognizer = _pathRecognizer;
        this.redirectTo = redirectTo;
        this.hash = this._pathRecognizer.hash;
    }
    get path() { return this._pathRecognizer.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RedirectRule directly'); }
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    recognize(beginningSegment) {
        var match = null;
        if (isPresent(this._pathRecognizer.matchUrl(beginningSegment))) {
            match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
        }
        return PromiseWrapper.resolve(match);
    }
    generate(params) {
        throw new BaseException(`Tried to generate a redirect.`);
    }
}
// represents something like '/foo/:bar'
export class RouteRule {
    // TODO: cache component instruction instances by params and by ParsedUrl instance
    constructor(_routePath, handler, _routeName) {
        this._routePath = _routePath;
        this.handler = handler;
        this._routeName = _routeName;
        this._cache = new Map();
        this.specificity = this._routePath.specificity;
        this.hash = this._routePath.hash;
        this.terminal = this._routePath.terminal;
    }
    get path() { return this._routePath.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RouteRule directly'); }
    recognize(beginningSegment) {
        var res = this._routePath.matchUrl(beginningSegment);
        if (isBlank(res)) {
            return null;
        }
        return this.handler.resolveComponentType().then((_) => {
            var componentInstruction = this._getInstruction(res.urlPath, res.urlParams, res.allParams);
            return new PathMatch(componentInstruction, res.rest, res.auxiliary);
        });
    }
    generate(params) {
        var generated = this._routePath.generateUrl(params);
        var urlPath = generated.urlPath;
        var urlParams = generated.urlParams;
        return this._getInstruction(urlPath, convertUrlParamsToArray(urlParams), params);
    }
    generateComponentPathValues(params) {
        return this._routePath.generateUrl(params);
    }
    _getInstruction(urlPath, urlParams, params) {
        if (isBlank(this.handler.componentType)) {
            throw new BaseException(`Tried to get instruction before the type was loaded.`);
        }
        var hashKey = urlPath + '?' + urlParams.join('&');
        if (this._cache.has(hashKey)) {
            return this._cache.get(hashKey);
        }
        var instruction = new ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params, this._routeName);
        this._cache.set(hashKey, instruction);
        return instruction;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVZ2aXBDQlVQLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3J1bGVzL3J1bGVzLnRzIl0sIm5hbWVzIjpbIlJvdXRlTWF0Y2giLCJQYXRoTWF0Y2giLCJQYXRoTWF0Y2guY29uc3RydWN0b3IiLCJSZWRpcmVjdE1hdGNoIiwiUmVkaXJlY3RNYXRjaC5jb25zdHJ1Y3RvciIsIlJlZGlyZWN0UnVsZSIsIlJlZGlyZWN0UnVsZS5jb25zdHJ1Y3RvciIsIlJlZGlyZWN0UnVsZS5wYXRoIiwiUmVkaXJlY3RSdWxlLnJlY29nbml6ZSIsIlJlZGlyZWN0UnVsZS5nZW5lcmF0ZSIsIlJvdXRlUnVsZSIsIlJvdXRlUnVsZS5jb25zdHJ1Y3RvciIsIlJvdXRlUnVsZS5wYXRoIiwiUm91dGVSdWxlLnJlY29nbml6ZSIsIlJvdXRlUnVsZS5nZW5lcmF0ZSIsIlJvdXRlUnVsZS5nZW5lcmF0ZUNvbXBvbmVudFBhdGhWYWx1ZXMiLCJSb3V0ZVJ1bGUuX2dldEluc3RydWN0aW9uIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSwwQkFBMEI7T0FDcEQsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkI7T0FDbkQsRUFBQyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0M7T0FHM0MsRUFBTSx1QkFBdUIsRUFBQyxNQUFNLGVBQWU7T0FDbkQsRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQjtBQUtuRCw2RUFBNkU7QUFDN0U7QUFBa0NBLENBQUNBO0FBRW5DLCtCQUErQixVQUFVO0lBQ3ZDQyxZQUNXQSxXQUFpQ0EsRUFBU0EsU0FBY0EsRUFBU0EsWUFBbUJBO1FBQzdGQyxPQUFPQSxDQUFDQTtRQURDQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBc0JBO1FBQVNBLGNBQVNB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ZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcnMvcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1VybCwgY29udmVydFVybFBhcmFtc1RvQXJyYXl9IGZyb20gJy4uL3VybF9wYXJzZXInO1xuaW1wb3J0IHtDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtSb3V0ZVBhdGh9IGZyb20gJy4vcm91dGVfcGF0aHMvcm91dGVfcGF0aCc7XG5pbXBvcnQge0dlbmVyYXRlZFVybH0gZnJvbSAnLi9yb3V0ZV9wYXRocy9yb3V0ZV9wYXRoJztcblxuXG4vLyBSb3V0ZU1hdGNoIG9iamVjdHMgaG9sZCBpbmZvcm1hdGlvbiBhYm91dCBhIG1hdGNoIGJldHdlZW4gYSBydWxlIGFuZCBhIFVSTFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlTWF0Y2gge31cblxuZXhwb3J0IGNsYXNzIFBhdGhNYXRjaCBleHRlbmRzIFJvdXRlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIHB1YmxpYyByZW1haW5pbmc6IFVybCwgcHVibGljIHJlbWFpbmluZ0F1eDogVXJsW10pIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdE1hdGNoIGV4dGVuZHMgUm91dGVNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWRpcmVjdFRvOiBhbnlbXSwgcHVibGljIHNwZWNpZmljaXR5KSB7IHN1cGVyKCk7IH1cbn1cblxuLy8gUnVsZXMgYXJlIHJlc3BvbnNpYmxlIGZvciByZWNvZ25pemluZyBVUkwgc2VnbWVudHMgYW5kIGdlbmVyYXRpbmcgaW5zdHJ1Y3Rpb25zXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0UnVsZSB7XG4gIGhhc2g6IHN0cmluZztcbiAgcGF0aDogc3RyaW5nO1xuICByZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudDogVXJsKTogUHJvbWlzZTxSb3V0ZU1hdGNoPjtcbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uO1xufVxuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSdWxlIGltcGxlbWVudHMgQWJzdHJhY3RSdWxlIHtcbiAgcHVibGljIGhhc2g6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXRoUmVjb2duaXplcjogUm91dGVQYXRoLCBwdWJsaWMgcmVkaXJlY3RUbzogYW55W10pIHtcbiAgICB0aGlzLmhhc2ggPSB0aGlzLl9wYXRoUmVjb2duaXplci5oYXNoO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7IHJldHVybiB0aGlzLl9wYXRoUmVjb2duaXplci50b1N0cmluZygpOyB9XG4gIHNldCBwYXRoKHZhbCkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigneW91IGNhbm5vdCBzZXQgdGhlIHBhdGggb2YgYSBSZWRpcmVjdFJ1bGUgZGlyZWN0bHknKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGBudWxsYCBvciBhIGBQYXJzZWRVcmxgIHJlcHJlc2VudGluZyB0aGUgbmV3IHBhdGggdG8gbWF0Y2hcbiAgICovXG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+IHtcbiAgICB2YXIgbWF0Y2ggPSBudWxsO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGF0aFJlY29nbml6ZXIubWF0Y2hVcmwoYmVnaW5uaW5nU2VnbWVudCkpKSB7XG4gICAgICBtYXRjaCA9IG5ldyBSZWRpcmVjdE1hdGNoKHRoaXMucmVkaXJlY3RUbywgdGhpcy5fcGF0aFJlY29nbml6ZXIuc3BlY2lmaWNpdHkpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShtYXRjaCk7XG4gIH1cblxuICBnZW5lcmF0ZShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUcmllZCB0byBnZW5lcmF0ZSBhIHJlZGlyZWN0LmApO1xuICB9XG59XG5cblxuLy8gcmVwcmVzZW50cyBzb21ldGhpbmcgbGlrZSAnL2Zvby86YmFyJ1xuZXhwb3J0IGNsYXNzIFJvdXRlUnVsZSBpbXBsZW1lbnRzIEFic3RyYWN0UnVsZSB7XG4gIHNwZWNpZmljaXR5OiBzdHJpbmc7XG4gIHRlcm1pbmFsOiBib29sZWFuO1xuICBoYXNoOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IE1hcDxzdHJpbmcsIENvbXBvbmVudEluc3RydWN0aW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBDb21wb25lbnRJbnN0cnVjdGlvbj4oKTtcblxuICAvLyBUT0RPOiBjYWNoZSBjb21wb25lbnQgaW5zdHJ1Y3Rpb24gaW5zdGFuY2VzIGJ5IHBhcmFtcyBhbmQgYnkgUGFyc2VkVXJsIGluc3RhbmNlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9yb3V0ZVBhdGg6IFJvdXRlUGF0aCwgcHVibGljIGhhbmRsZXI6IFJvdXRlSGFuZGxlciwgcHJpdmF0ZSBfcm91dGVOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNwZWNpZmljaXR5ID0gdGhpcy5fcm91dGVQYXRoLnNwZWNpZmljaXR5O1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3JvdXRlUGF0aC5oYXNoO1xuICAgIHRoaXMudGVybWluYWwgPSB0aGlzLl9yb3V0ZVBhdGgudGVybWluYWw7XG4gIH1cblxuICBnZXQgcGF0aCgpIHsgcmV0dXJuIHRoaXMuX3JvdXRlUGF0aC50b1N0cmluZygpOyB9XG4gIHNldCBwYXRoKHZhbCkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigneW91IGNhbm5vdCBzZXQgdGhlIHBhdGggb2YgYSBSb3V0ZVJ1bGUgZGlyZWN0bHknKTsgfVxuXG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+IHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm91dGVQYXRoLm1hdGNoVXJsKGJlZ2lubmluZ1NlZ21lbnQpO1xuICAgIGlmIChpc0JsYW5rKHJlcykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKS50aGVuKChfKSA9PiB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSB0aGlzLl9nZXRJbnN0cnVjdGlvbihyZXMudXJsUGF0aCwgcmVzLnVybFBhcmFtcywgcmVzLmFsbFBhcmFtcyk7XG4gICAgICByZXR1cm4gbmV3IFBhdGhNYXRjaChjb21wb25lbnRJbnN0cnVjdGlvbiwgcmVzLnJlc3QsIHJlcy5hdXhpbGlhcnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB2YXIgZ2VuZXJhdGVkID0gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gICAgdmFyIHVybFBhdGggPSBnZW5lcmF0ZWQudXJsUGF0aDtcbiAgICB2YXIgdXJsUGFyYW1zID0gZ2VuZXJhdGVkLnVybFBhcmFtcztcbiAgICByZXR1cm4gdGhpcy5fZ2V0SW5zdHJ1Y3Rpb24odXJsUGF0aCwgY29udmVydFVybFBhcmFtc1RvQXJyYXkodXJsUGFyYW1zKSwgcGFyYW1zKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29tcG9uZW50UGF0aFZhbHVlcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogR2VuZXJhdGVkVXJsIHtcbiAgICByZXR1cm4gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRJbnN0cnVjdGlvbih1cmxQYXRoOiBzdHJpbmcsIHVybFBhcmFtczogc3RyaW5nW10sIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOlxuICAgICAgQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuaGFuZGxlci5jb21wb25lbnRUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdldCBpbnN0cnVjdGlvbiBiZWZvcmUgdGhlIHR5cGUgd2FzIGxvYWRlZC5gKTtcbiAgICB9XG4gICAgdmFyIGhhc2hLZXkgPSB1cmxQYXRoICsgJz8nICsgdXJsUGFyYW1zLmpvaW4oJyYnKTtcbiAgICBpZiAodGhpcy5fY2FjaGUuaGFzKGhhc2hLZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0KGhhc2hLZXkpO1xuICAgIH1cbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBuZXcgQ29tcG9uZW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHVybFBhdGgsIHVybFBhcmFtcywgdGhpcy5oYW5kbGVyLmRhdGEsIHRoaXMuaGFuZGxlci5jb21wb25lbnRUeXBlLCB0aGlzLnRlcm1pbmFsLFxuICAgICAgICB0aGlzLnNwZWNpZmljaXR5LCBwYXJhbXMsIHRoaXMuX3JvdXRlTmFtZSk7XG4gICAgdGhpcy5fY2FjaGUuc2V0KGhhc2hLZXksIGluc3RydWN0aW9uKTtcblxuICAgIHJldHVybiBpbnN0cnVjdGlvbjtcbiAgfVxufVxuIl19