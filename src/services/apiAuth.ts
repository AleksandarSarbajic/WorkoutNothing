import { Provider } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

interface Credidentials {
  userName?: string;
  email: string;
  password: string;
}

export async function signUp({ userName, email, password }: Credidentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: userName, avatar_url: "" },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: Credidentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function outhLogin({
  provider = "google",
}: {
  provider: Provider;
}) {
  const { data: providerData, error: providerError } =
    await supabase.auth.signInWithOAuth({
      provider: provider,
    });

  if (providerError) throw new Error(providerError.message);

  return providerData;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

interface Update {
  password?: string;
  userName?: string;
  avatar?: File;
  gender?: string;
  data?: { userName: string; gender: string };
}

export async function updateCurrentUser({
  password,
  userName,
  gender,
}: Update) {
  const updateData: Update = {};

  if (password) {
    updateData.password = password;
  }

  if (userName && gender) {
    updateData.data = { userName, gender };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserAvatar({ avatar }: Update) {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${self.crypto.randomUUID()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_file: fileName,
      avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      profile_picture: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

export async function deleteAvatar() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  const { error: StorageError } = await supabase.storage
    .from("avatars")
    .remove([data.user.user_metadata.avatar_file]);

  if (StorageError) throw new Error(StorageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_file: "",
      avatar_url: "",
      profile_picture: "",
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

export async function resetPasswordEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/resetPassword",
  });
  if (error) {
    throw new Error(error.message);
  }
}
export async function resetUpdatePassword(new_password: string) {
  const { error } = await supabase.auth.updateUser({ password: new_password });

  if (error) {
    throw new Error(error.message);
  }
}
