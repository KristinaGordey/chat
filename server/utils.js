const trimStr = (str) => (typeof str === "string" ? str.trim().toLowerCase() : "");


const _trimStr = trimStr;
export { _trimStr as trimStr };