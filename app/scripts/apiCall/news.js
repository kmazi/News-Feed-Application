import JQuery from "jquery";

export function processSourceData(obj){
    let source = [];
    for (let index = 0; index < obj.length; index++) {
            source[index] = {};
            source[index].id = obj[index].id;
            source[index].name = obj[index].name;
            source[index].description = obj[index].description; 
        }
    return source;
}

export function getAllSources(){
    $.ajax({
        url:"https://newsapi.org/v1/sources", 
        dataType: 'json',
        success: (data)=>{
        let sources = processSourceData(data.sources);
        return sources;
    },
    error:(jqXHR, textStatus, errorThrown)=>{
        return errorThrown;
    }
});
}
