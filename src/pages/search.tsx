import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, useMediaQuery, Typography, ImageList, Avatar, Button } from '@mui/material';
import apiAccess from '../api/api';
import Layout from '../components/Layout';
import MenuSlider from '../components/common/MenuSlider';
import Loading from '../components/common/Loading/Loading';
import Post from '../components/common/Post';
import SearchPost from '../components/common/SearchPost';
import UserList from '../components/UserList';
import { ExampleModal } from '../components/SlideProfile';
import { useRecoilValue } from 'recoil';
import { followingState } from '../recoil/follow';

interface Props {
  props: {
    data: {
      id: number;
      username: string;
      user_icon: string;
      cover_image: string;
      profile: string;
    }[]
}}

const Search = (props:Props) => {
  const users = props.props.data;
  const router = useRouter();
  const { q } = router.query;
  const matches = useMediaQuery('(min-width:800px)');
  const following = useRecoilValue(followingState)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(0)

  const [posts, setPosts] = useState([]);
  const [accounts, setAccounts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cols, setCols] = useState(2);
  const matches600_max = useMediaQuery('(max-width:600px)');
  const matches600 = useMediaQuery('(min-width:600px)');
  const matches768 = useMediaQuery('(min-width:768px)');
  const matches992 = useMediaQuery('(min-width:992px)');
  const matches1200 = useMediaQuery('(min-width:1200px)');

  const n = matches1200 ? 5: 6;

  /* Api access */
  const getSearchResults = (query: any) => {
    let payload = {
      query: query,
    };
    const funcSuccess = (response: any) => {
      if (response.data.status === 'success') {
        setPosts(response.data.data.posts);
        setAccounts(response.data.data.accounts);
      }
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('SEARCH', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    getSearchResults(q);
  }, [q]);

  useEffect(() => {
    setIsLoading(false)
  }, [posts, accounts]);

  return (
    <Layout>
      {isLoading ? 
      <Loading />
      :
      <>
        <Box className="search-result-menu noselect">
        </Box>
        <Box className="search-results-wrapper">
          {
            q && q !== '' && (
              <Box className="mb-2" sx={{ padding: "0 2rem" }}>
                <Typography variant="h4" component="h1" sx={{ fontSize: "1.5em" }}>{`${q}の検索結果`}</Typography>
              </Box>
            )
          }
        </Box>
          {
            accounts.length > 0 && (
              <Box sx={{mb:2}}>
                <Box className="d-flex" sx={{ alignItems: "baseline", padding: "0 2rem", mb:"20px" }}>
                  <Typography className="mr-2" variant="h6" component="h2">ユーザー</Typography>
                </Box>
                <Box className="slideMenu" sx={{ padding: { xs: "0 0.5rem", md: "0 2rem" }, height: "210px", overflow:"auto", whiteSpace:"nowrap", display:"flex" }}>
                  {accounts.slice(0, 10).map((account: any, index: number) => (
                    <Box sx={{mr:"20px", p:3, border:"1px solid white", borderRadius:"20px", minWidth:"200px", width:"100%"}}>
                      <Avatar src={`http://localhost:8000${account.user_icon}`} sx={{borderRadius:"20%"}} />
                      <Typography>{account.username}</Typography>
                      <Box display="flex" sx={{width:"100%", justifyContent:"end"}}>
                        <Typography sx={{color:"#00B8FF", fontWeight:"bold", cursor:"pointer"}}>フォロー</Typography>
                      </Box>
                      <Box className="profile" sx={{width:"100%",display:"flex"}}>
                        <Typography>{account.profile}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <MenuSlider theme={"white"} className={".slideMenu"} upNum={10}/>
              </Box>
            )
          }
          {posts.length > 0 && (
            <Box sx={{mx:"auto", width:"100%", maxWidth:"1000px", height:"100%", display:"flex", gap:"20px"}}>
              <Box  sx={{}}>
                <Box className="d-flex" sx={{ alignItems: "baseline", padding: "0 2rem", mb:"20px" }}>
                  <Typography variant="h6" component="h2">投稿</Typography>
                </Box>
                {posts.map((post: any, index: number) => (
                  <SearchPost post={post} setId={setId} setOpen={setOpen}/>
                ))}
              </Box>
              {matches &&
              <Box sx={{width:"320px", maxHeight:"500px",background:"rgb(0, 40, 70)", overflow:"scroll", '& ::-webkit-scrollbar': {display: "none"}, transform:"translateY(100px)"}}>
                <Box  className="recommend"  sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"70px", borderBottom:"1px solid  rgba(200,200,200,0.3)", position:"sticky", top:"0", zIndex:"10"}}>
                  <Typography fontSize="20px" sx={{color:"white", fontWeight:"bold", mr:"auto", ml:"20px"}}>おすすめユーザー</Typography>
                </Box> 
                <Box>
                  {users.map((user) => (
                    <UserList user={user} />
                  ))}
                </Box>
            </Box>
            }
            </Box>
          )}

      </>
      }

{open && <ExampleModal id={id} open={open} onClose={()=>setOpen(false)} following={following}/>}
    </Layout>
  );
};

export default Search;


export const getServerSideProps = async (context: any) => {
  const res = await fetch("http://localhost:8000/api/accounts/");
  const props = await res.json();
  return {
    props: {
      props,
    },
  };
}
