var DEFAULT_COLUMNS_COUNT = 1;
var DEFAULT_GUTTER = 20;
var DEFAULT_COLUMNS_COUNT_POINTS = { 1000: 4 };
var MasonryType;
(function (MasonryType) {
    MasonryType["column"] = "column";
    MasonryType["flex"] = "flex";
})(MasonryType || (MasonryType = {}));
var MasonryDirection;
(function (MasonryDirection) {
    MasonryDirection["row"] = "row";
    MasonryDirection["column"] = "column";
})(MasonryDirection || (MasonryDirection = {}));

export { DEFAULT_COLUMNS_COUNT, DEFAULT_COLUMNS_COUNT_POINTS, DEFAULT_GUTTER, MasonryDirection, MasonryType };
