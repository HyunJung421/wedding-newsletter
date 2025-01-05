import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider, message } from "antd";
import { MessageFilled, LinkOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  KAKAOTALK_API_TOKEN,
  KAKAOTALK_SHARE_IMAGE,
  WEDDING_INVITATION_URL,
  GROOM_NAME,
  BRIDE_NAME,
} from "../config";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 100%;
  text-align: center;
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const RoundedButton = styled(Button)`
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  width: 80%;
  margin: 10px auto;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const KakaoTalkShareButton = styled(RoundedButton)`
  background: #ffe066;
  border-color: #ffe066;
  color: #181600;

  &:hover {
    background-color: #ffd54f !important;
    border-color: #ffd54f !important;
  }
  &:focus {
    background-color: #ffd54f !important;
    border-color: #ffd54f !important;
  }
`;

const LinkShareButton = styled(RoundedButton)`
  background-color: rgba(255, 153, 204, 0.3);
  border-color: rgba(255, 153, 204, 0.3) !important;
  color: var(--title-color) !important;

  &:hover {
    background-color: rgba(255, 153, 204, 0.5) !important;
    border-color: rgba(255, 153, 204, 0.5) !important;
  }
`;

const Share = () => {
  const createKakaoButton = () => {
    if (!window.Kakao) {
      message.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(KAKAOTALK_API_TOKEN);
    }

    kakao.Link.createDefaultButton({
      objectType: "feed",
      container: "#sendKakao",
      content: {
        title: `${GROOM_NAME}❤${BRIDE_NAME} 결혼 소식`,
        description: "아래의 '소식장 열기' 버튼을 눌러 읽어주세요🤵👰",
        imageUrl: KAKAOTALK_SHARE_IMAGE,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "청첩장 열기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      installTalk: true,
    });

    setTimeout(() => {
      const sendKakaoButton = document.getElementById("sendKakao");
      if (sendKakaoButton) {
        sendKakaoButton.click();
        message.success("카카오톡으로 소식장을 공유합니다!");
      }
    }, 100);
  };

  const handleLinkCopy = () => {
    message.success({
      content: "링크가 복사되었습니다.",
      duration: 2, // 메시지가 2초 후 사라지도록 설정
      style: {
        marginTop: "20vh", // 화면 중앙에 표시
      },
    });
  };

  return (
    <Wrapper>
      <Divider
        data-aos="fade-up"
        plain
        style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>공유하기</Title>
      </Divider>
      {/* <KakaoTalkShareButton
        icon={<MessageFilled style={{ fontSize: "1.5rem" }} />}
        id="sendKakao"
        size="large"
        onClick={createKakaoButton}>
        카카오톡으로 공유하기
      </KakaoTalkShareButton> */}
      <CopyToClipboard text={WEDDING_INVITATION_URL}>
        <LinkShareButton
          icon={<LinkOutlined style={{ fontSize: "1.5rem" }} />}
          size="large"
          onClick={handleLinkCopy}>
          링크 복사하기
        </LinkShareButton>
      </CopyToClipboard>
    </Wrapper>
  );
};

export default Share;
