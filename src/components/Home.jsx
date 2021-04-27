import React, { useContext, useEffect } from 'react';
import Video from './Video';
import CategoriesBar from './CategoriesBar';
import { AppContext } from './Context';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: theme.spacing(12),
        [theme.breakpoints.only('sm')]: {
            marginLeft: '56px',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '180px',
        },
    },
}));

const Home = () => {
    const classes = useStyles();
    const { isMenuOpen, popularVideos, fetchPopularVideos } = useContext(
        AppContext
    );

    useEffect(() => {
        fetchPopularVideos();
    }, []);

    const fetchVideos = () => {
        fetchPopularVideos();
    };

    return (
        <div>
            <CategoriesBar />
            <div item className={classes.root}>
                <Container maxWidth={false}>
                    <InfiniteScroll
                        dataLength={popularVideos.length}
                        next={fetchVideos}
                        hasMore={true}
                        loader={<h1>Loading...</h1>}
                    >
                        <Grid container spacing={4}>
                            {popularVideos.map((video) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={video.id}
                                    >
                                        <Video video={video} key={video.id} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </InfiniteScroll>
                </Container>
            </div>
        </div>
    );
};

export default Home;
