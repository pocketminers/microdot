class DataMap extends Map<string, string | number | boolean | undefined | string[]> {}
type DataMapJSON = {[key: string]: string | number | boolean | string[] | undefined}

export {
    DataMap,
    DataMapJSON
};

export * from './load';
export * from './manifest';
export * from './meta';
export * from './spec';
