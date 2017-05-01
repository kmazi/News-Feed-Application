import {processSourceData, getAllSources} from '../app/scripts/apiCall/news'

test("Retrieving data from source", ()=>{
    let testdata =[{
        id: "abc-news-au",
        name: "ABC News (AU)",
        description: "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
        url: "http://www.abc.net.au/news",
        category: "general",
        language: "en",
        country: "au",
        urlsToLogos: {
        small: "",
        medium: "",
        large: ""
        },
        sortBysAvailable: [
        top
        ]
        },
        {
        id: "al-jazeera-english",
        name: "Al Jazeera English",
        description: "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
        url: "http://www.aljazeera.com",
        category: "general",
        language: "en",
        country: "us",
        urlsToLogos: {
        small: "",
        medium: "",
        large: ""
        },
        sortBysAvailable: [
        "top",
        "latest"
        ]
        },
        {
        id: "ars-technica",
        name: "Ars Technica",
        description: "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
        url: "http://arstechnica.com",
        category: "technology",
        language: "en",
        country: "us",
        urlsToLogos: {
        small: "",
        medium: "",
        large: ""
        },
        sortBysAvailable: [
        "top",
        "latest"
        ]
},];
    let result = [
        {
            id: "abc-news-au",
            name: "ABC News (AU)",
            description: "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more."
        },
        {
            id: "al-jazeera-english",
            name: "Al Jazeera English",
            description: "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule."
        },
        {
            id: "ars-technica",
            name: "Ars Technica",
            description: "The PC enthusiast's resource. Power users and the tools they love, without computing religion."
        }
    ];
    let data = processSourceData(testdata);
    expect(data).toEqual(result);
});

describe("Data type the function processed", ()=>{
    it("must be an array",()=>{
        let data = [{id:"cnn-news", name:"CNN News"}];
        let isarray = typeof data === 'object' && data.length>-1;
        expect(isarray).toBe(true);
    });

    it("must not be an object",()=>{
        let data = {id:"cnn-news", name:"CNN News"};
        let isarray = typeof data === 'object' && data.length>-1;
        expect(isarray).toBe(false);
    });
});