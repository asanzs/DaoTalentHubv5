from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        errors = []
        page.on("console", lambda msg: errors.append(f"CONSOLE {msg.type}: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda err: errors.append(f"PAGE ERROR: {err}"))
        
        print("Visiting /es/whitepaper...")
        page.goto("http://localhost:3001/es/whitepaper", wait_until="networkidle")
        
        print("Detected errors:")
        for err in errors:
            print(err)
            
        browser.close()

if __name__ == "__main__":
    main()
