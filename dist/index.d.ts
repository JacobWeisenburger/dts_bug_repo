declare function foo(): string;

declare namespace fooModule {
	export { foo };
}

export {
	fooModule,
};

export {};
