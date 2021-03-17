import Head from "next/head";
import { useSession } from "next-auth/client";
import axios from "axios";
import useSWR from "swr";
import FeedModule from "../modules/Feed.module";

import { Observer } from "../util/constants";

const fetcher = (url) => axios.get(url).then((r) => r.data);

const dev = () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR(
    `/api/hive/rankedposts?sort=trending&tag=coldbrew-dev&observer=${Observer}`,
    fetcher
  );
  return (
    <>
      <Head>
        <title>dev log</title>
      </Head>
      <FeedModule
        session={session}
        loading={loading}
        data={data}
        error={error}
      />
    </>
  );
};

export default dev;
