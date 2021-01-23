import { CircularProgress } from "@material-ui/core";
import postApi from "api/postApi";
import DetailComponent from "features/Post/components/Detail";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

PostDetail.propTypes = {};

function PostDetail() {
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const { params } = useRouteMatch();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await postApi.getById(params.postId);
        console.log(data);
        setPostDetail(data);
      } catch (error) {
        console.log("Failed to fetch to post detail", error);
      }

      setLoading(false);
    })();
  }, [params]);
  return (
    <div>
      {loading && <CircularProgress />}
      {postDetail && <DetailComponent data={postDetail} />}
    </div>
  );
}

export default PostDetail;
