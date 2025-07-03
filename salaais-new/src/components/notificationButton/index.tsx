import { useEffect, useState } from "react";
import { Color, Size } from "../../global";
import { Icon } from "../icon";
import { AnimationType, IconType, StartAnimation } from "../icon/models";
import { Text } from "../text";
import * as Styled from "./style"

export interface HrProps {
  countNotification: number
}

export function NotificationButton() {
  const [notificationNumber, setNotificationNumber] = useState(0)

  function getNotification() {
    setNotificationNumber(2)
  }

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <Styled.Content>

      {notificationNumber !== 0 &&
        <Styled.NotificaionNumber>
          <Text text={`${notificationNumber}`} size={Size.Xs} color={Color.BgSecondary} />
        </Styled.NotificaionNumber>
      }
      <Icon
        iconType={IconType.Notification}
        size={Size.S}
        background={Color.BgSecondary}
        startAnimation={StartAnimation.Hover}
        animationType={AnimationType.Shake}
        shadow
      />
    </Styled.Content>
  );
}
