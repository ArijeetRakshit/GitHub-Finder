export const getPages = (headerLink) => {
    if(!headerLink || headerLink === '') return {};

    let paginateInfo = {
        userName: '',
        first: null,
        prev: null,
        next: null,
        last: null
    };
    const links = headerLink.split(',');

    links.forEach((link,index) => {
        let splitLink = link.split(';');
        let url = splitLink[0].trim().slice(1,-1);
        let mode = splitLink[1].trim().split("=")[1].slice(1,-1);
        let params = new URL(url).searchParams;
        if(index === 0) paginateInfo.userName = params.get('q');
        paginateInfo[mode] = +params.get('page');
    });
    return paginateInfo;
};