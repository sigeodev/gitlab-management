"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var axiosInstance = axios_1.default.create();
var ACCESS_LEVEL;
(function (ACCESS_LEVEL) {
    ACCESS_LEVEL[ACCESS_LEVEL["OWNER"] = 50] = "OWNER";
    ACCESS_LEVEL[ACCESS_LEVEL["DEVELOPER"] = 40] = "DEVELOPER";
})(ACCESS_LEVEL = exports.ACCESS_LEVEL || (exports.ACCESS_LEVEL = {}));
var GitlabManagement = (function () {
    function GitlabManagement(projectId, privateToken) {
        var _this = this;
        this.apiUrl = 'https://gitlab.com/api/v4/projects';
        this.headers = {};
        this.setProjectId = function (projectId) { return (_this.projectId = projectId); };
        this.setHeaders = function (headers) {
            _this.headers = __assign({}, _this.headers, headers);
        };
        this.setPrivateToken = function (privateToken) {
            _this.privateToken = privateToken;
        };
        this.getProjectId = function () { return _this.projectId; };
        this.getPrivateToken = function () { return _this.privateToken; };
        this.getHeaders = function () { return _this.headers; };
        this.getProjects = function (props) {
            return axiosInstance({
                method: 'GET',
                url: _this.apiUrl + "?" + query_string_1.stringify(props),
                headers: _this.headers
            });
        };
        this.getMembers = function (props) {
            return axiosInstance({
                method: 'GET',
                url: _this.apiUrl + "/" + _this.projectId + "/members/all?" + query_string_1.stringify(props),
                headers: _this.headers
            });
        };
        this.openIssue = function (props) {
            return axiosInstance({
                method: 'POST',
                url: _this.apiUrl + "/" + _this.projectId + "/issues",
                data: props,
                headers: _this.headers
            });
        };
        this.getIssues = function (props) {
            return axiosInstance({
                method: 'GET',
                url: _this.apiUrl + "/" + _this.projectId + "/issues?" + query_string_1.stringify(props),
                headers: _this.headers
            });
        };
        this.closeIssue = function (props) {
            return axiosInstance({
                method: 'DELETE',
                url: _this.apiUrl + "/" + _this.projectId + "/issues/" + props.issue_iid,
                headers: _this.headers
            });
        };
        if (projectId) {
            this.setProjectId(projectId);
        }
        if (privateToken) {
            this.setPrivateToken(privateToken);
            this.setHeaders({ 'Private-Token': privateToken });
        }
    }
    return GitlabManagement;
}());
exports.default = GitlabManagement;
