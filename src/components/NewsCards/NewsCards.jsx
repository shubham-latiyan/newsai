import React from 'react';
import NewsCard from './NewsCard/NewsCard';

const NewsCards = ({ articles, activeArticle }) => {
    return (
        <>
            {articles.map((article, i) => (
                <NewsCard key={i + 1} activeArticle={activeArticle} i={i} article={article} />
            ))
            }
        </>
    );
};

export default NewsCards;