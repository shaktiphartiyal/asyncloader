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
            try
            {
                document.head.appendChild(script);
            }
            catch(e)
            {
                let scriptOne = document.getElementsByTagName('script')[0];
                scriptOne.parentNode.insertBefore(script, scriptOne);
            }
        },
        loadStyle:function(url, callback, media){
            return new Promise((resolve, reject) => {
                let head  = document.getElementsByTagName('head')[0];
                let link  = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                if (!media)
                {
                    link.media = 'all';
                }
                else
                {
                    link.media = media;
                }
                link.href = url;
                link.onload = () => {
                    resolve();
                    if(typeof(callback) == "function")
                    {
                        callback();
                    }
                };
                head.appendChild(link);
            });
        },
    };
    window.asyncloader = ψ;
})();
