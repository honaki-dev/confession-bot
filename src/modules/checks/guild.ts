import {
  ChatInputCommandInteraction,
  GuildMember,
  PermissionResolvable
} from "discord.js";

export const checkPerms = (perms: PermissionResolvable) => {
  return (interaction: ChatInputCommandInteraction) => {
    const member = interaction.member as GuildMember;
    return {
      isOk: member.permissions.has(perms),
      message: "You do not have permission to execute this command."
    };
  };
};
