"use strict";

app.component("notFound", {
    templateUrl: "components/not-found.html",
    controller: "NotFoundController",
    bindings: {}
});

app.config(function ($stateProvider) {
    $stateProvider.state({
        name: "notFound",
        url: "/not-found",
        component: "notFound"
    });
});

app.controller("NotFoundController", function ($log) {

});