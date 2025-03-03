import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { AlertCircle, Check, Loader2, Upload, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { supabase } from "../../lib/supabase";

const ProfileSettings = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
      });
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (error) throw error;
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

    setUploading(true);
    setError(null);

    try {
      // Check if bucket exists and create it if not
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets || !buckets.find((bucket) => bucket.name === "avatars")) {
        await supabase.storage.createBucket("avatars", {
          public: true,
        });
      }

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await updateProfile({
        avatar_url: data.publicUrl,
      });

      if (updateError) throw updateError;

      setAvatarUrl(data.publicUrl);
      setSuccess("Avatar updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and how others see you on the
                platform
              </CardDescription>
            </CardHeader>

            <CardContent>
              {success && (
                <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Success
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertTitle className="text-red-800 dark:text-red-300">
                    Error
                  </AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarUrl || undefined} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xl">
                        {profile?.first_name?.charAt(0) || "U"}
                        {profile?.last_name?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <Label
                        htmlFor="avatar-upload"
                        className="cursor-pointer bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded-md text-sm flex items-center justify-center transition-colors"
                      >
                        {uploading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        {uploading ? "Uploading..." : "Upload Photo"}
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 opacity-70"
                      />
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        To change your email, please go to the Security tab
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user_type">Account Type</Label>
                      <Input
                        id="user_type"
                        value={
                          profile?.user_type?.charAt(0).toUpperCase() +
                            profile?.user_type?.slice(1) || ""
                        }
                        disabled
                        className="bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-600 dark:text-emerald-400">
                Preference settings coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SecuritySettings = () => {
  const { user, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!user?.email) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await resetPassword(user.email);
      if (error) throw error;
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your password and account security
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {success && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">
              Success
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-800 dark:text-red-300">
              Error
            </AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={user?.email || ""}
            disabled
            className="bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 opacity-70"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
            Change Password
          </h3>
          <p className="text-emerald-600 dark:text-emerald-400">
            You'll receive an email with instructions to reset your password.
          </p>
          <Button
            onClick={handleResetPassword}
            className="bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Password Reset Email"
            )}
          </Button>
        </div>

        <div className="pt-4 border-t border-emerald-100 dark:border-emerald-800/30 mt-6">
          <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-2">
            Account Security
          </h3>
          <p className="text-emerald-600 dark:text-emerald-400 mb-4">
            Additional security options will be available soon, including
            two-factor authentication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
