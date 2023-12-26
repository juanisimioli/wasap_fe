export const STATUS_MESSAGE = {
  Sending: 0,
  Sent: 1,
  Delivered: 2,
};

export const time2CharLong = (time) => {
  return String(time).padStart(2, "0");
};

export const epochToJsDate = (ts) => {
  return new Date(Number(ts) * 1000);
};

export const JsDateToEpoch = (date = new Date()) => {
  return (date.getTime() - date.getMilliseconds()) / 1000;
};

export const dateTimeInfo = (epoch) => {
  const d = epochToJsDate(parseInt(epoch));
  const date = `${time2CharLong(d.getDate())}/${time2CharLong(
    d.getMonth() + 1
  )}/${d.getFullYear()}`;
  const time = `${time2CharLong(d.getHours())}:${time2CharLong(
    d.getMinutes()
  )}`;

  return {
    date,
    time,
  };
};

export const breakDownTimestamp = (messages) => {
  return messages.map((message) => {
    const { date, time } = dateTimeInfo(message?.timestamp);
    return {
      ...message,
      date,
      time,
    };
  });
};

export const groupMessagesBySender = (messagesByDate) => {
  return messagesByDate.map(({ date, messages }) => {
    return {
      date,
      groups: messages.reduce((groups, message) => {
        const lastGroup = groups[groups.length - 1];

        if (!lastGroup || lastGroup[0].sender !== message.sender) {
          groups.push([message]);
        } else {
          lastGroup.push(message);
        }

        return groups;
      }, []),
    };
  });
};

export const groupMessagesByDate = (messages) => {
  const groupsByDate = messages.reduce((acc, message) => {
    const { date } = message;

    if (!acc[date]) {
      acc[date] = [message];
    } else {
      acc[date].push(message);
    }

    return acc;
  }, {});

  const result = Object.entries(groupsByDate).map(([date, messages]) => ({
    date,
    messages,
  }));

  return result;
};

export const assignStatusToAllMessages = (messages) => {
  return messages.map(
    ({
      text,
      amount,
      sender,
      timestamp,
      status = STATUS_MESSAGE.Delivered,
    }) => {
      return { text, amount, sender, timestamp, status };
    }
  );
};

export const orderMessagesByTimeStamp = (messages) => {
  messages.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  return messages;
};

export const calculateChat = (messages) => {
  return groupMessagesBySender(
    groupMessagesByDate(
      breakDownTimestamp(
        assignStatusToAllMessages(orderMessagesByTimeStamp(messages))
      )
    )
  );
};

export const shortAddress = (address) => {
  if (!address || typeof address !== "string") return;
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
};

export const shortBalance = (balance) => {
  if (!balance || typeof balance !== "string") return;
  const [integerPart, decimalPart] = balance.split(".");

  const decimalShort = decimalPart.slice(0, 4);
  return `${integerPart}.${decimalShort}`;
};

export const getUrlAvatar = (cid) => {
  // cid => content identifier IPFS
  return cid
    ? `${process.env.NEXT_PUBLIC_AVATAR_URL}${cid}`
    : "/default-user.svg";
};

export const playNotification = () => {
  var audio = document.getElementById("notification");
  audio.play();
};
