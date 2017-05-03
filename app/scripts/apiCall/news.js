export function listSources(obj){
    let source = [];
    for (let index = 0; index < obj.length; index++) {
            source[index] = {};
            source[index].id = obj[index].id;
            source[index].name = obj[index].name;
            source[index].description = obj[index].description; 
        }
    return source;
}
export function getSources(){
    const url = 'https://newsapi.org/v1/sources';
    const data = axios.get(url).then(res => res.data.sources);
    const sources = listSources(data);
    return sources;
}


export function formatHeadlines(data){
    let articles = [];
    for (var i = 0; i < data.length; i++) {
        articles[i] = {};
        articles[i].title = data[i].title;
        articles[i].description = data[i].description;
        articles[i].url = data[i].url;
        articles[i].urlToImage = data[i].urlToImage;
    }
    return articles;
}

export function headLines(source){
    const url = 'https://newsapi.org/v1/articles';
    const data = axios.get(url,{params: {source: source}}).then(res => res.data.sources);
    const sources = listSources(data);
    return sources;
}
// export function headLines(source){
    
//     JQuery.ajax({
//         url:"https://newsapi.org/v1/articles", 
//         data: {source: source},
//         dataType: 'json',
//         success: (data)=>{
//             let headlines = formatHeadlines(data.articles);
//     },
//     error:(jqXHR, textStatus, errorThrown)=>{
//         return errorThrown;
//     }
//     });
// }