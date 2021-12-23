var OriginTitile = document.title;
        var titleTime;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                $('[rel="shortcut icon"]').attr('href', "//www.anotherhome.net/wp-content/themes/Amativeness/fail.ico");
                document.title = '(●—●)，崩溃啦！';
                clearTimeout(titleTime);

            } else {
                $('[rel="shortcut icon"]').attr('href', "//www.anotherhome.net/wp-content/themes/Amativeness/favicon.ico");
                document.title = '(/≧▽≦/)咦！又好了！' + OriginTitile;
                titleTime = setTimeout(function () {
                    document.title = OriginTitile;
                }, 2000);
                15
            }
            16
        });