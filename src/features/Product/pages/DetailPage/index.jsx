import { CircularProgress } from "@material-ui/core";
import productApi from "api/productApi";
import Detail from "features/Product/components/Detail";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

DetailPage.propTypes = {};

function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const { params } = useRouteMatch();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await productApi.getById(params.productId);
        console.log("kiem tra duong dan: ", data);
        setProductDetail(data);
      } catch (error) {
        console.log("Failed to fetch to detail page", error);
      }

      setLoading(false);
      console.log(params.productId);
    })();
  }, [params.productId]);

  return (
    <div>
      {loading && <CircularProgress />}
      {<Detail data={productDetail} />}
    </div>
  );
}

export default DetailPage;
