window.onload = function()
{
    const path = window.location.pathname.split("/").pop().split(".")[0];
    console.log(path);
    //response for link click
    switch(path)
    {
        //main page
        case "":
        case "index":
        {
            loadPage("index");
            break;
        }
        case "home":
        {
            loadPage("home");
            break;
        }
        case "about":
        {
            loadPage("about");
            break;
        }
        case "stats":
        {
            loadPage("stats");
            break;
        }
        //games (not sure if this is necassary might change)
        case "tictactoe":
        {
            loadPage("tictactoe");
            break;
        }
        case "connect":
        {
            loadPage("connect");
            break;
        }
        //default error handling
        default:
        {
            loadPage("error");
            break;
        }
    }
    //movement from button click
    document.querySelectorAll(".menu__item").forEach((item) =>
    {
        item.addEventListener("click", function()
        {
            const path = item.getAttribute("value");
            loadPage(path);
            if(path == "index")
            {
                window.history.pushState("", "", "/");
                return;
            }

            window.history.pushState("", "", path);
        });
    });
}
    //global function to load a page rq from server
    function loadPage($path)
    {
        console.log($path);
        if($path == "") return;
        if($path == "index") return;
        //fetches from pages file
        const container = document.getElementById("container");
        const request = new XMLHttpRequest();
        request.open("GET", "pages/" + $path + ".html");
        request.send();
        request.onload = function()
        {
            if(request.status == 200)
            {
                //if req succeed import html and rewrite script
                container.innerHTML = request.responseText;
                document.title = $path;
                
                const script = container.querySelector("script");
                const Nscript = document.createElement("script");
                Nscript.textContent = script.textContent;
                script.parentNode.replaceChild(Nscript, script);
            }
            else
            {
                return;
            }
        }
    }
//handles back and forward history movement
window.addEventListener("popstate", function()
{
    const path = location.pathname;
    loadPage(path);
});

// i think the relaod issue could be due to the GET /about rather than, GET pages/about 
// so i will have to search how to handle as such