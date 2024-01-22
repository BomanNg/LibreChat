import { EModelEndpoint } from 'librechat-data-provider';
import {
  MinimalPlugin,
  GPTIcon,
  AnthropicIcon,
  AzureMinimalIcon,
  BingAIMinimalIcon,
  GoogleMinimalIcon,
  CustomMinimalIcon,
  AssistantIcon,
  LightningIcon,
} from '~/components/svg';
import UnknownIcon from './UnknownIcon';
import { cn } from '~/utils';

export const icons = {
  [EModelEndpoint.azureOpenAI]: AzureMinimalIcon,
  [EModelEndpoint.openAI]: GPTIcon,
  [EModelEndpoint.gptPlugins]: MinimalPlugin,
  [EModelEndpoint.anthropic]: AnthropicIcon,
  [EModelEndpoint.chatGPTBrowser]: LightningIcon,
  [EModelEndpoint.google]: GoogleMinimalIcon,
  [EModelEndpoint.bingAI]: BingAIMinimalIcon,
  [EModelEndpoint.custom]: CustomMinimalIcon,
  [EModelEndpoint.assistant]: ({
    className = '',
    assistantName,
    avatar,
    size,
  }: {
    className?: string;
    assistantName?: string;
    avatar?: string;
    size?: number;
  }) => {
    if (assistantName && avatar) {
      return (
        <img
          src={avatar}
          className="bg-token-surface-secondary dark:bg-token-surface-tertiary h-full w-full"
          alt={assistantName}
          width="80"
          height="80"
        />
      );
    } else if (assistantName) {
      return <AssistantIcon className={cn('text-token-secondary', className)} size={size} />;
    }

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('icon-md shrink-0', className)}
      >
        <path
          d="M19.3975 1.35498C19.3746 1.15293 19.2037 1.00021 19.0004 1C18.7971 0.999793 18.6259 1.15217 18.6026 1.35417C18.4798 2.41894 18.1627 3.15692 17.6598 3.65983C17.1569 4.16274 16.4189 4.47983 15.3542 4.60264C15.1522 4.62593 14.9998 4.79707 15 5.00041C15.0002 5.20375 15.1529 5.37457 15.355 5.39746C16.4019 5.51605 17.1562 5.83304 17.6716 6.33906C18.1845 6.84269 18.5078 7.57998 18.6016 8.63539C18.6199 8.84195 18.7931 9.00023 19.0005 9C19.2078 8.99977 19.3806 8.84109 19.3985 8.6345C19.4883 7.59673 19.8114 6.84328 20.3273 6.32735C20.8433 5.81142 21.5967 5.48834 22.6345 5.39851C22.8411 5.38063 22.9998 5.20782 23 5.00045C23.0002 4.79308 22.842 4.61992 22.6354 4.60157C21.58 4.50782 20.8427 4.18447 20.3391 3.67157C19.833 3.15623 19.516 2.40192 19.3975 1.35498Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 3C11.4833 3 11.8974 3.34562 11.9839 3.82111C12.4637 6.46043 13.279 8.23983 14.5196 9.48039C15.7602 10.721 17.5396 11.5363 20.1789 12.0161C20.6544 12.1026 21 12.5167 21 13C21 13.4833 20.6544 13.8974 20.1789 13.9839C17.5396 14.4637 15.7602 15.279 14.5196 16.5196C13.279 17.7602 12.4637 19.5396 11.9839 22.1789C11.8974 22.6544 11.4833 23 11 23C10.5167 23 10.1026 22.6544 10.0161 22.1789C9.53625 19.5396 8.72096 17.7602 7.48039 16.5196C6.23983 15.279 4.46043 14.4637 1.82111 13.9839C1.34562 13.8974 1 13.4833 1 13C1 12.5167 1.34562 12.1026 1.82111 12.0161C4.46043 11.5363 6.23983 10.721 7.48039 9.48039C8.72096 8.23983 9.53625 6.46043 10.0161 3.82111C10.1026 3.34562 10.5167 3 11 3ZM5.66618 13C6.9247 13.5226 7.99788 14.2087 8.89461 15.1054C9.79134 16.0021 10.4774 17.0753 11 18.3338C11.5226 17.0753 12.2087 16.0021 13.1054 15.1054C14.0021 14.2087 15.0753 13.5226 16.3338 13C15.0753 12.4774 14.0021 11.7913 13.1054 10.8946C12.2087 9.99788 11.5226 8.9247 11 7.66618C10.4774 8.9247 9.79134 9.99788 8.89461 10.8946C7.99788 11.7913 6.9247 12.4774 5.66618 13Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  unknown: UnknownIcon,
};
