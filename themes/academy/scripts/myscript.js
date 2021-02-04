const { title } = require('process');

hexo.extend.helper.register('citation',function(bibtex,type){
    const Cite = require('citation-js');
    const fs=require('fs');
    var bibtxt=fs.readFileSync(bibtex);;
    let cite_item_=new Cite(bibtxt.toString());
    if(type =='card'){
        let citation_=cite_item_.format('data', {format: 'object'})
        return citation_[0];
    }
    else if(type=='plain'){
        let citation_=cite_item_.format('bibliography', {template: 'apa',
        lang: 'en-US'})
        citation_= citation_.replace('Peng, H.','<strong>Peng, Hao</strong>')
        return citation_;
    }
    
});

hexo.extend.helper.register('author_list',function(author){
   
    var author_list='';
    for(var i in author){
        var au=author[i];
        if(au.given=='Hao'&& au.family=='Peng'){
            author_list=author_list.concat('<strong>',au.given.toString(),'</strong> <strong>',au.family.toString(),'</strong>, ')
 
        }else{
            author_list=author_list.concat(au.given.toString(),' ',au.family.toString(),', ')
        }       
    }
    author_list=author_list.substring(0,author_list.length-2)
    return author_list;

});
hexo.extend.helper.register('pub_list',function(citation, conference){
   
    var pub_list='';
    pub_list=pub_list.concat(citation['container-title']);
    if(conference!=''&&conference!=null){
        pub_list=pub_list.concat('(',conference.toString(),')');
    }
    if(citation.issued['date-parts']!=''&&citation.issued['date-parts']!=null){
        pub_list=pub_list.concat(', ',citation.issued['date-parts'].toString());
    }
    if(citation.volume!=''&&citation.volume!=null){
        pub_list=pub_list.concat(', ',citation.volume.toString()); 
        if(citation.page!=''&&citation.page!=null){
            pub_list=pub_list.concat(': ',citation.page.toString()); 
        } 
    }
    pub_list=pub_list.concat('.'); 
    return pub_list;
});