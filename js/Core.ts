/** Core **/
///<reference path="../Definition/angularjs/angular.d.ts"/>
module ck{
    export function extendArray(dst:any[],src:any[]){
        var mergeTwo = function extendArray(dst1,src1){
            var has, s, d;
            for(var i= 0,il=src1.length;i<il;i++){
                has = false;
                s=src1[i];
                for(var j= 0,jl=dst1.length;j<jl;j++){
                    d = dst1[j];
                    if(src1[i]==dst1[j]){
                        has = true;
                        break;
                    }
                }
                if(!has){
                    dst1.push(s);
                }
            }
        }

        for(var x=1;x<arguments.length;x++){
            mergeTwo(dst,arguments[x]);
        }
    }

    export function extendRequires(module:string,required:string[]):ng.IModule;
    export function extendRequires(...required:string[]):ng.IModule;
    export function extendRequires(x,y):ng.IModule{
        var m = angular.module(typeof y != "array"?x:"ngApp");
        ck.extendArray(m.requires,y);
        return m;
    }

    export function module(name?:string):ng.IModule{
        return angular.module(name?name:"ngApp");
    }
}

angular.module("ui.bootstrap", ["ui.bootstrap.tpls"]);
angular.module("ui.bootstrap.tpls", []);
var rootck = document.getElementsByTagName("html");
if(rootck.length>0){
    rootck[0].setAttribute("ng-app", "ngApp");
    angular.module('ngApp', ['ui.bootstrap']);
}

var $;
if(!$){
    $=function(selector){
        if(angular.isString(selector)){
            return angular.element(document.querySelectorAll(selector));
        }else{
            return angular.element(selector);
        }
    }
}