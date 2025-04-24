import { FC } from "react";

interface MessageAvatarProps {
  src: string;
  alt: string;
}
const MessageAvatar: FC<MessageAvatarProps> = ({ src, alt }) => {
  return (
    <div className=" chat-image avatar">
      <div className="size-10 rounded-full border">
        <img src={src || "/avatar.png"} alt={alt} />
      </div>
    </div>
  );
};

export default MessageAvatar;
