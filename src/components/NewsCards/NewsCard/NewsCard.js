import React, { useEffect } from 'react';
import { Row, Col, Card, CardTitle, CardBody, CardImg, CardText } from 'reactstrap';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
    useEffect(() => {
        if (i === activeArticle) {
            document.getElementById(`scroll_${i}`).scrollIntoView({
                behavior: 'smooth',
                block: "center", inline: "center"
            });
        }
    }, [i, activeArticle]);

    return (
        <Row id={"scroll_" + i} style={{ marginBottom: '20px' }} className={activeArticle === i ? 'activeCard' : null} >
            <Card className="hvr-grow-shadow">
                <Row className="no-gutters">
                    <Col md="4">
                        <CardImg
                            top
                            width="100%"
                            src={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}
                            title={title}
                        />
                    </Col>
                    <Col md="8">
                        <CardBody>
                            <CardTitle onClick={() => { window.open(url, '_blank') }} style={{ cursor: 'pointer' }}>{title}
                                <div style={{ fontSize: '12px' }}>
                                    {(new Date(publishedAt)).toDateString()}
                                </div>
                            </CardTitle>
                            <CardText>{description}</CardText>
                            <div onClick={() => { window.open(url, '_blank') }} style={{ fontSize: '13px', position: 'absolute', bottom: '6px', cursor: 'pointer' }}>
                                Read full story at: {source.name}
                            </div>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
};

export default NewsCard;
