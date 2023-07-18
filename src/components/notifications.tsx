/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//Components
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiXMark,
} from "react-icons/hi2";

//Misc
import { toast } from "react-toastify";
import { exposeStyles } from "@/lib/styles";

//Types
import type { ToastContentProps, ToastOptions } from "react-toastify";

type NotificationProps = Partial<ToastContentProps> & {
  className?: string;
  primaryText: string;
  infoText?:
    | string
    | ((close: ToastContentProps["closeToast"]) => React.ReactNode);
  letftIcon?: JSX.Element | JSX.Element[] | null;
  actionButton?: JSX.Element | JSX.Element[];
  actionPosition?: "bottom" | "right";
  disableClose?: boolean;
  closeIcon?: JSX.Element | JSX.Element[] | null;
  type?: "success" | "error" | "info";
  classes?: ReturnType<typeof useStyles>;
};

const useStyles = exposeStyles({
  replace: {
    root: "",
  },
});

export default function Notification({
  primaryText = "Success!",
  actionPosition = "right",
  disableClose = false,
  closeToast,
  type = "success",
  ...props
}: NotificationProps) {
  const classes = useStyles(props);

  let icon;
  if (props.letftIcon || props.letftIcon === null) {
    icon = props.letftIcon;
  } else {
    switch (type) {
      case "success":
        icon = (
          <div className="flex-shrink-0">
            <HiOutlineCheckCircle
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          </div>
        );
        break;
      case "error":
        icon = (
          <div className="flex-shrink-0">
            <HiOutlineExclamationCircle
              className="h-6 w-6 text-red-400"
              aria-hidden="true"
            />
          </div>
        );
        break;
      case "info":
        icon = (
          <div className="flex-shrink-0">
            <HiOutlineInformationCircle
              className="h-6 w-6 text-blue-400"
              aria-hidden="true"
            />
          </div>
        );
        break;
      default:
        icon = null;
        break;
    }
  }

  let actionRight;
  let actionBottom;
  if (props.actionButton) {
    if (actionPosition === "right") {
      actionRight = props.actionButton;
    } else {
      actionBottom = props.actionButton;
    }
  }

  let info;
  if (props.infoText) {
    info =
      typeof props.infoText === "function" ? (
        <div className="mt-1 text-sm text-gray-500">
          {props.infoText(closeToast)}
        </div>
      ) : (
        <div className="mt-1 text-sm text-gray-500">{props.infoText}</div>
      );
  }

  let close;
  if (!disableClose) {
    close = (
      <div className="ml-4 flex flex-shrink-0">
        <button
          className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={closeToast}
        >
          <span className="sr-only">Close</span>
          {props.closeIcon ? (
            props.closeIcon
          ) : (
            <HiXMark className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div className={classes.root}>
        <div className="flex items-start">
          {icon}
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{primaryText}</p>
            <div className="mb-3">{info}</div>
            {actionBottom}
          </div>
          {actionRight}
          {close}
        </div>
      </div>
    </>
  );
}

export const notifyFetchError = (
  error: unknown,
  primaryText = "Error",
  infoText = "Something went wrong"
) => {
  let errorCode = primaryText;
  let errorMessage = infoText;
  //@ts-ignore
  if (typeof error === "object") {
    //@ts-ignore
    errorMessage = error?.error?.message || error?.data?.stack || errorMessage;
    //@ts-ignore
    errorCode = error?.error?.data?.code || error?.data?.code || errorCode;
  }
  return toast(
    <Notification
      primaryText={errorCode}
      infoText={errorMessage}
      type="error"
    />,
    {
      autoClose: 3000,
    }
  );
};

export const notifySuccess = (
  primaryText = "Success",
  infoText?: string,
  options?: ToastOptions
) =>
  toast(
    <Notification
      type="success"
      primaryText={primaryText}
      infoText={infoText}
    />,
    {
      autoClose: 3000,
      ...options,
    }
  );

export const notifyError = (
  primaryText = "Error",
  infoText?: string,
  options?: ToastOptions
) =>
  toast(
    <Notification type="error" primaryText={primaryText} infoText={infoText} />,
    {
      autoClose: 3000,
      ...options,
    }
  );

export const notifyInfo = (
  primaryText = "Info",
  infoText?: string,
  options?: ToastOptions
) =>
  toast(
    <Notification type="info" primaryText={primaryText} infoText={infoText} />,
    {
      autoClose: 3000,
      ...options,
    }
  );
