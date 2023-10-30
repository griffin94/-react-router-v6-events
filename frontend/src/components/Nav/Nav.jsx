import { useEffect, useState } from "react";
import Media from "react-media";
import { ThemeConsumer } from "styled-components";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import {
  DesktopList,
  Item,
  List,
  MobileNavigation,
  NavButton,
  Navigation,
} from ".";

const MobileNav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timer;
    if (open) {
      setMounted(true);
    } else {
      timer = setTimeout(() => setMounted(false), 500);
    }

    return () => timer && clearTimeout(timer);
  }, [open]);

  return (
    <>
      <NavButton onClick={() => setOpen((state) => !state)}>
        {open ? <IoClose size="2rem" /> : <HiMenu size="2rem" />}
      </NavButton>
      {mounted ? (
        <MobileNavigation className={{ true: "open", false: "close" }[open]}>
          <List>{children}</List>
        </MobileNavigation>
      ) : null}
    </>
  );
};

const DesktopNav = ({ children }) => (
  <Navigation>
    <DesktopList>{children}</DesktopList>
  </Navigation>
);

const Nav = ({ children }) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Media queries={{ small: `(max-width: ${theme.breakpoints.sm})` }}>
          {(matches) =>
            matches.small ? (
              <MobileNav>{children}</MobileNav>
            ) : (
              <DesktopNav>{children}</DesktopNav>
            )
          }
        </Media>
      )}
    </ThemeConsumer>
  );
};

export default Object.assign(Nav, { Item });
