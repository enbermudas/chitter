import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import { FaHeart, FaRedo, FaCommentAlt } from "react-icons/fa";

interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
};

const Comment = ({
  author,
  content,
  createdAt,
}: CommentProps) => {
  return (
    <Flex
      width="full"
      direction="column"
    >
      <Flex direction="column">
        <Heading>{author}</Heading>
        <Text size="xs" color="gray">{createdAt}</Text>
      </Flex>

      <Text>{content}</Text>

      <Flex mt="2">
        <Button variant="ghost" leftIcon={<FaCommentAlt/>}>
          <Text color="gray">123</Text>
        </Button>

        <Button variant="ghost" leftIcon={<FaHeart/>}>
          <Text color="gray">32</Text>
        </Button>

        <Button variant="ghost" leftIcon={<FaRedo/>}>
          <Text color="gray">5</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Comment;
