import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { Box, Container, Stack, Textarea, Divider, Spinner } from "@chakra-ui/react";
import moment from "moment";
import 'moment/locale/es';
import { Sidebar, Comment } from "@/components/index";
import { Chit, getChits, createChit } from "@/lib/db";

moment.locale('es');

const Home: NextPage = () => {
  const [refresh, setRefresh] = useState(true);
  const [chits, setChits] = useState<Array<Chit>>([]);
  const [text, setText] = useState("");

  const fetchChits = async () => {
    const newChits = await getChits();
    setChits(newChits);
  };

  useEffect(() => {
    setChits([]);
    fetchChits();
  }, []);

  useEffect(() => {
    if (refresh) fetchChits();
  }, [refresh]);

  useEffect(() => {
    if (chits.length) setRefresh(false);
  }, [chits]);

  const handleNewChit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && text !== "") {
      e.preventDefault();
      createChit({ author: "Kike", content: text.trim() });
      setText("");
      setRefresh(true);
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  return (
    <div>
      <Head>
        <title>Chitter</title>
        <meta name="description" content="I don't give a chit." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar>
        <main>
          <Box>
            <Container maxW="7xl" py={4} as={Stack} px={0}>
              <Stack spacing={12} align="center" direction="column">
                <Textarea
                  placeholder="¿Qué estás pensando?"
                  resize="none"
                  onKeyDown={handleNewChit}
                  onChange={handleTextChange}
                  value={text}
                />

                <Divider/>

                {!!chits.length && chits.map((chit) => {
                  return (
                    <Comment
                      key={chit.id}
                      author={chit.author}
                      content={chit.content}
                      createdAt={moment(chit.createdAt).fromNow()}
                    />
                  )
                })}

                {refresh && <Spinner size='xl' />}
              </Stack>
            </Container>
          </Box>
        </main>
      </Sidebar>
    </div>
  );
};

export default Home;
