import React, { useState } from "react";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ui/color-picker";
import { Upload } from "lucide-react";

interface WebsiteConfig {
  general: {
    siteName: string;
    logo: string;
    favicon: string;
    description: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    aboutUs: string;
    contactInfo: string;
  };
  localization: {
    languages: string[];
    defaultLanguage: string;
    currency: string;
  };
}

const WebsiteConfig = () => {
  const [config, setConfig] = useState<WebsiteConfig>({
    general: {
      siteName: "Efoy",
      logo: "/logo.svg",
      favicon: "/favicon.ico",
      description: "Luxury Real Estate Platform",
    },
    theme: {
      primaryColor: "#10B981",
      secondaryColor: "#064E3B",
      accentColor: "#34D399",
      darkMode: true,
    },
    content: {
      heroTitle: "Discover Your Dream Property",
      heroSubtitle:
        "Experience unparalleled luxury in the world's most prestigious locations",
      aboutUs: "Efoy is a premium real estate platform...",
      contactInfo: "contact@efoy.com",
    },
    localization: {
      languages: ["English", "Spanish", "French"],
      defaultLanguage: "English",
      currency: "USD",
    },
  });

  const handleSave = () => {
    // Here you would typically:
    // 1. Update the website configuration
    // 2. Regenerate necessary components
    // 3. Update theme variables
    // 4. Rebuild and deploy changes
    console.log("Saving configuration:", config);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Website Configuration
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400">
              Customize and manage your website's appearance and content
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Website Name</Label>
                  <Input
                    value={config.general.siteName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        general: {
                          ...config.general,
                          siteName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={config.general.logo}
                      alt="Logo"
                      className="w-12 h-12 rounded-lg"
                    />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" /> Upload New Logo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={config.general.description}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        general: {
                          ...config.general,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: config.theme.primaryColor }}
                      />
                      <Input
                        value={config.theme.primaryColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: {
                              ...config.theme,
                              primaryColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: config.theme.secondaryColor }}
                      />
                      <Input
                        value={config.theme.secondaryColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: {
                              ...config.theme,
                              secondaryColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: config.theme.accentColor }}
                      />
                      <Input
                        value={config.theme.accentColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: {
                              ...config.theme,
                              accentColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input
                    value={config.content.heroTitle}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Subtitle</Label>
                  <Input
                    value={config.content.heroSubtitle}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          heroSubtitle: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>About Us</Label>
                  <Textarea
                    value={config.content.aboutUs}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: { ...config.content, aboutUs: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contact Information</Label>
                  <Input
                    value={config.content.contactInfo}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          contactInfo: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localization">
            <Card>
              <CardHeader>
                <CardTitle>Localization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {config.localization.languages.map((lang) => (
                      <div
                        key={lang}
                        className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 rounded-full text-sm text-emerald-700 dark:text-emerald-300"
                      >
                        {lang}
                      </div>
                    ))}
                    <Button variant="outline" size="sm">
                      Add Language
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Input
                    value={config.localization.defaultLanguage}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        localization: {
                          ...config.localization,
                          defaultLanguage: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input
                    value={config.localization.currency}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        localization: {
                          ...config.localization,
                          currency: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default WebsiteConfig;
