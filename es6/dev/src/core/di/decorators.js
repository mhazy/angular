import { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata } from './metadata';
import { makeDecorator, makeParamDecorator } from '../util/decorators';
/**
 * Factory for creating {@link InjectMetadata}.
 */
export var Inject = makeParamDecorator(InjectMetadata);
/**
 * Factory for creating {@link OptionalMetadata}.
 */
export var Optional = makeParamDecorator(OptionalMetadata);
/**
 * Factory for creating {@link InjectableMetadata}.
 */
export var Injectable = makeDecorator(InjectableMetadata);
/**
 * Factory for creating {@link SelfMetadata}.
 */
export var Self = makeParamDecorator(SelfMetadata);
/**
 * Factory for creating {@link HostMetadata}.
 */
export var Host = makeParamDecorator(HostMetadata);
/**
 * Factory for creating {@link SkipSelfMetadata}.
 */
export var SkipSelf = makeParamDecorator(SkipSelfMetadata);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVnZpcENCVVAudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RpL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFlBQVk7T0FDdEgsRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0I7QUFrRHBFOztHQUVHO0FBQ0gsV0FBVyxNQUFNLEdBQWtCLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRFOztHQUVHO0FBQ0gsV0FBVyxRQUFRLEdBQW9CLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFNUU7O0dBRUc7QUFDSCxXQUFXLFVBQVUsR0FBeUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFaEc7O0dBRUc7QUFDSCxXQUFXLElBQUksR0FBZ0Isa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEU7O0dBRUc7QUFDSCxXQUFXLElBQUksR0FBZ0Isa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEU7O0dBRUc7QUFDSCxXQUFXLFFBQVEsR0FBb0Isa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0TWV0YWRhdGEsIE9wdGlvbmFsTWV0YWRhdGEsIEluamVjdGFibGVNZXRhZGF0YSwgU2VsZk1ldGFkYXRhLCBIb3N0TWV0YWRhdGEsIFNraXBTZWxmTWV0YWRhdGF9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHttYWtlRGVjb3JhdG9yLCBtYWtlUGFyYW1EZWNvcmF0b3J9IGZyb20gJy4uL3V0aWwvZGVjb3JhdG9ycyc7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RGYWN0b3J5IHtcbiAgKHRva2VuOiBhbnkpOiBhbnk7XG4gIG5ldyAodG9rZW46IGFueSk6IEluamVjdE1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBPcHRpb25hbE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbEZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IE9wdGlvbmFsTWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdGFibGVNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZUZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IEluamVjdGFibGVNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgU2VsZk1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxmRmFjdG9yeSB7XG4gICgpOiBhbnk7XG4gIG5ldyAoKTogU2VsZk1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBIb3N0TWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RGYWN0b3J5IHtcbiAgKCk6IGFueTtcbiAgbmV3ICgpOiBIb3N0TWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIFNraXBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNraXBTZWxmRmFjdG9yeSB7XG4gICgpOiBhbnk7XG4gIG5ldyAoKTogU2tpcFNlbGZNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSW5qZWN0TWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIEluamVjdDogSW5qZWN0RmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihJbmplY3RNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIE9wdGlvbmFsTWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIE9wdGlvbmFsOiBPcHRpb25hbEZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoT3B0aW9uYWxNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdGFibGVNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgSW5qZWN0YWJsZTogSW5qZWN0YWJsZUZhY3RvcnkgPSA8SW5qZWN0YWJsZUZhY3Rvcnk+bWFrZURlY29yYXRvcihJbmplY3RhYmxlTWV0YWRhdGEpO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIFNlbGY6IFNlbGZGYWN0b3J5ID0gbWFrZVBhcmFtRGVjb3JhdG9yKFNlbGZNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEhvc3RNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgSG9zdDogSG9zdEZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoSG9zdE1ldGFkYXRhKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgU2tpcFNlbGZNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgU2tpcFNlbGY6IFNraXBTZWxmRmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihTa2lwU2VsZk1ldGFkYXRhKTsiXX0=