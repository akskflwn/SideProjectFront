import "./home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-title">
        <span>Shim Kyu Young SideProject</span>
      </div>
      <div className="home-contents">
        ✅자유롭게 게시판에 글을 작성하고
        <br />
        ✅댓글 또는 좋아요로 여러 의견을 나눠보세요
      </div>
      <div className="about-project">
        이 프로젝트는 레퍼런스로 쓰기위해
        <br />
        <span>React</span>와<span> SpringBoot</span>로 만들었습니다😊
      </div>
      <div className="my-website">
        <div className="my-website-title">Contact</div>
        <a href="https://github.com/akskflwn" target="_blank">
          🏴GitHub
        </a>
        <a
          href="https://festive-hedgehog-54c.notion.site/71379b60994640bf8eb7c61a86868f7b"
          target="_blank"
        >
          📖 Notion
        </a>
      </div>
    </div>
  );
};
export default Home;
