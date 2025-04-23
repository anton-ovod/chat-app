import { FC } from "react";

interface NoConversationsFoundProps {
  message: string;
}
const NoConversationsFound: FC<NoConversationsFoundProps> = ({ message }) => {
  return <div className="text-center text-zinc-500 py-4">{message}</div>;
};

export default NoConversationsFound;
