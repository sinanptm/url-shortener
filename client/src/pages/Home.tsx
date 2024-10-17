import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkICon } from 'lucide-react';
import { createShortUrl, markLinkClick } from '@/lib/api';
import { Link } from '@/types';

export default function Home() {
  const [url, setUrl] = useState('');
  const [link, setLink] = useState<Link>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await createShortUrl(url);
      setLink(data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleLinkClick = async () => {
    try {
      if (link) {
        const orgLink = await markLinkClick(link._id);
        window.location.href = orgLink;
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">URL Shortener</CardTitle>
          <CardDescription>Enter a long URL to get a shortened version</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="Enter your URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit">Shorten</Button>
            </div>
          </form>
          {link && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm font-medium text-muted-foreground mb-2">Shortened URL:</p>
              <div className="flex items-center space-x-2">
                <LinkICon className="h-4 w-4 text-primary" />
                <a
                  href={link.shortLink}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {link.shortLink}
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}