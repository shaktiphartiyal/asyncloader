/**
 * Created by hk009 on 4/16/17.
 */
'use strict';
(function(ψ){
    ψ = {
        __proto__:{
            scriptLoadCount: 0,
        },
        loadJS:function(path, isAsync, callback, alternate){
            ψ.scriptLoadCount++;
            let async = true;
            if(!isAsync)
            {
                async = false;
            }
            let script = document.createElement('script');
            let scriptOne = document.getElementsByTagName('script')[0];
            script.type = "text/javascript";
            script.async = async;
            script.src = path;
            script.onload = function(){
                if(typeof(callback) == "function")
                {
                    callback();
                }
                ψ.scriptLoadCount--;
            };
            if(alternate)
            {
                script.onerror = script.src = alternate;
            }
            scriptOne.parentNode.insertBefore(script, scriptOne);
        },
    };
    window.asyncloader = ψ;
})();
