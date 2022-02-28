/**
 * @Description:
 * @author: bubao
 * @Date: 2022-02-28 10:56:37
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-28 13:41:05
 */
const assert = require("assert");
const Path2Regexp = require("path-to-regexp");
const url = require("url");
const urlPath = "/abc/123";

assert.equal(Path2Regexp.pathToRegexp(urlPath).test(url.parse("/abc/123?a=123").pathname), true);
