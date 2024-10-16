export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="container flex items-center justify-center py-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} URLShortener. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
