import React from 'react';
import NewsCard from './NewsCard/NewsCard';

const NewsCards = ({ articles, activeArticle }) => {
    if (!articles.length) {
        // return (
        //   <Grow in>
        //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        //       {infoCards.map((infoCard) => (
        //         <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
        //           <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
        //             <Typography variant="h5" component="h5">{infoCard.title}</Typography>
        //             {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
        //             <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
        //           </div>
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Grow>
        // );
    }
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
