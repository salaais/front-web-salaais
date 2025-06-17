import { makeEnum } from "../utils/enum";

export const Color = makeEnum({
    TxtPrimary: "var(--txt-primary)",
    TxtSecondary: "var(--txt-secondary)",
    TxtTertiary: "var(--txt-tertiary)",
    TxtTitle: "var(--txt-title)",
    TxtSolid: "var(--txt-solid)",
    ButtonTxt: "var(--button-txt)",
    Link: "var(--link)",

    Primary: "var(--primary-color)",
    Secondary: "var(--secondary-color)",
    Success: "var(--success-color)",
    DangerPrimary: "var(--danger-primary)",
    DangerSecondary: "var(--danger-secondary)",
    Warning: "var(--warning-color)",
    Info: "var(--info-color)",
    Admin: "var(--admin-color)",
    AdminSecondary: "var(--admin-secondary-color)",
    Light: "var(--light-color)",
    Dark: "var(--dark-color)",
    FollowButtonColor: "var(--follow-button-color)",

    BgPrimary: "var(--bg-primary)",
    BgSecondary: "var(--bg-secondary)",
    BgTertiary: "var(--bg-tartiary)",
    BgPrimaryTable: "var(--bg-primary-table-color)",
    BgSecondaryTable: "var(--bg-secondary-table-color)",

    Green: "var(--green)",
    Red: "var(--red)",
    Blue: "var(--blue)",
    DarkGreen: "var(--dark-green)",
    Purple: "var(--purple)",
    Yellow: "var(--yellow)",
    Pink: "var(--pink)",
    Orange: "var(--orange)",

    MsgSend: "var(--msg-send)",
    AchievementsComum: "var(--achievements-comum)",
    AchievementsRaro: "var(--achievements-rare)",
    AchievementsLendario: "var(--achievements-legendary)",
})
