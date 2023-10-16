import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  
  
  const { id } = useParams();

  console.log(channelDetail, videos)
  

  useEffect(() => {
    fetchFromAPI(`channels?part=snippets&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));
    
    fetchFromAPI(`search?channelId=${id}&part=snippets&order=date`)
    .then((data) => setVideos(data?.items));
  }, [id]);
  
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(71,67,129,1) 0%, rgba(97,97,129,1) 50%, rgba(43,49,50,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail