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
    setNotificationNumber(1)// 10, 100
  }

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <Styled.Content>

      {notificationNumber !== 0 &&
        <Styled.NotificaionNumber>
          <Text
            text={`${notificationNumber}`}
            size={Size.Xs}
            color={Color.BgSecondary}
            bold
            pointer
          />
        </Styled.NotificaionNumber>
      }

      <Icon
        iconType={IconType.Notification}
        size={Size.S}
        background={Color.BgSecondary}
        shadow
        startAnimation={notificationNumber !== 0 ? StartAnimation.Infinite : undefined}
        animationType={notificationNumber !== 0 ? AnimationType.ShakeWithPause : undefined}
        animationDuration={1.5}
      />

    </Styled.Content>
  );
}
