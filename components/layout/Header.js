import Image from "../common/Image";

export default function Header() {
  return (
    <header className="main-header fixed-top d-flex align-items-center bg-white border-bottom">
      <div className="container">
        <div className="row">
          <div className="col">
            <a>
              <Image src="/static/images/icon-arrow-left-greyDark.png" />
            </a>
          </div>
          <div className="col-5">
            <p className="mb-0">Dress</p>
          </div>
          <div className="col text-right">
            <a>
              <Image src="/static/images/icon-search-greyDark.png" />
            </a>
          </div>
          <div className="col text-right">
            <a>
              <Image src="/static/images/icon-heart-greyDark.png" />
            </a>
          </div>
          <div className="col text-right">
            <a>
              <Image src="/static/images/icon-cart-greyDark.png" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
