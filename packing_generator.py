import os
import json
import requests
import time
import re
from typing import Optional, Dict, List

# Gemini API Configuration
GEMINI_API_KEY = "AIzaSyA7scVzCGYB8qoCNUkCu0xrhbuEptJkyu0"
API_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
MODEL_NAME = "gemini-2.5-flash"

# File paths
INPUT_JSON_FILE = "packing_input.json"
OUTPUT_JSON_FILE = "packing_output.json"

headers = {
    "Authorization": f"Bearer {GEMINI_API_KEY}",
    "Content-Type": "application/json",
}


class PackingListGenerator:
    """
    Generates personalized packing lists using Gemini API
    Follows the same pattern as the blog generation system
    """

    def __init__(self):
        print("🎒 Packing List Generator initialized")
        self.api_calls = 0
        self.successful_generations = 0

    def build_packing_prompt(
        self,
        destination: str,
        days: int,
        gender: str = "female",
        user_preferences: Dict = None,
    ) -> str:
        """
        Build a comprehensive prompt for packing list generation
        Takes into account destination, duration, and user preferences
        """

        # Personalize greeting based on gender
        greeting = (
            "Hey beta 👨‍🍳! Mummy ne teri packing tayyar kar di! 💚"
            if gender == "male"
            else "Hey beta 👩‍🍳! Mummy ne teri packing tayyar kar di! 💚"
        )

        duration_text = f"{days} din" if days > 1 else "1 din"

        prompt = f"""You are a caring Indian mother (MUMMY) helping your child pack for a trip.

TASK: Create a comprehensive, warm, and helpful packing list for a trip to {destination} for {days} days.

STYLE GUIDELINES:
- Be warm, caring, and mother-like in your tone
- Use Hinglish (mix of Hindi and English) liberally with emoji
- Format as clear bullet points
- Be practical and thoughtful
- Add personalized tips and reminders
- Keep it conversational like a real mother talking to her child

PACKING LIST STRUCTURE:
Create sections for:
1. 👕 CLOTHES - Weather-appropriate clothing for {destination}
2. 💊 MEDICINES & HEALTH - Essential medicines and first aid items
3. 🧴 TOILETRIES - Bath and personal care items
4. 🎒 ESSENTIALS - Important documents and travel items
5. 👵 MUMMY'S EXTRA TIPS - Special motherly advice and comfort items

CUSTOMIZATION:
- Consider weather in {destination} for clothing recommendations
- Include gender-appropriate suggestions (casual, comfortable)
- Add 2-3 extra items specific to {destination}
- For longer trips ({days}+ days), suggest laundry options or extra items

FORMAT RULES:
- Use bullet points (• or -)
- Keep each item concise and clear
- Include emojis for visual appeal
- Mix Hindi and English naturally
- Be specific (not just "clothes" but "2-3 t-shirts" or "comfortable pajamas")

START WITH: "{greeting}"

Then provide the packing list with all 5 sections. End with a warm motherly message like:
"Beta, ye sab pack kar le. Mummy ki du'a tumhare sath hai! 💚✨"

Remember: This is for a {duration_text} trip to {destination}. Make recommendations accordingly."""

        return prompt

    def generate_packing_list(
        self,
        destination: str,
        days: int,
        gender: str = "female",
        user_preferences: Dict = None,
    ) -> Optional[str]:
        """
        Call Gemini API to generate packing list
        Similar to generate_blog() but for packing lists
        """

        prompt = self.build_packing_prompt(destination, days, gender, user_preferences)

        data = {
            "model": MODEL_NAME,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a caring Indian mother helping pack for trips. Be warm, practical, and use Hinglish naturally.",
                },
                {"role": "user", "content": prompt},
            ],
        }

        try:
            print(
                f"🔄 Calling Gemini API for {destination} ({days} days)..."
            )
            response = requests.post(API_URL, headers=headers, json=data, timeout=30)
            response.raise_for_status()

            self.api_calls += 1
            result = response.json()["choices"][0]["message"]["content"]
            print(f"✅ Successfully generated packing list for {destination}")
            return result

        except requests.exceptions.Timeout:
            print(f"⏱️ API timeout for {destination}")
            return None
        except requests.exceptions.RequestException as e:
            print(f"❌ API request failed for {destination}: {e}")
            return None
        except (KeyError, ValueError) as e:
            print(f"❌ Failed to parse API response: {e}")
            return None
        except Exception as e:
            print(f"❌ Unexpected error generating packing for {destination}: {e}")
            return None

    def clean_packing_content(self, content: str) -> str:
        """
        Clean the packing list response
        Remove any extra formatting or introductory phrases
        Similar to rephrase_blog_2()
        """

        # Remove markdown formatting
        content = re.sub(r"\*\*|\*|__", "", content)

        # Remove common AI intro phrases
        content = re.sub(
            r"^(Sure[, ]*|Here is.*?:|Of course[, ]*|Certainly[, ]*).*?\n+",
            "",
            content,
            flags=re.IGNORECASE | re.MULTILINE,
        )

        # Clean up extra whitespace
        content = re.sub(r"\n\n+", "\n", content).strip()

        return content

    def process_packing_requests(self):
        """
        Main processing function
        Reads from input.json, generates packing lists, saves to output.json
        Similar to process_blogs()
        """

        if not os.path.exists(INPUT_JSON_FILE):
            print(f"❌ Input file '{INPUT_JSON_FILE}' not found.")
            print(f"📝 Creating example file...")
            self.create_example_input()
            return

        try:
            with open(INPUT_JSON_FILE, "r", encoding="utf-8") as infile:
                requests_list = json.load(infile)
        except Exception as e:
            print(f"❌ Failed to read {INPUT_JSON_FILE}: {e}")
            return

        if not isinstance(requests_list, list) or not requests_list:
            print("⚠️ JSON file is empty or invalid format.")
            return

        results = []

        for idx, request in enumerate(requests_list, 1):
            destination = request.get("destination", "").strip()
            days = request.get("days", 0)
            gender = request.get("gender", "female").lower()
            request_id = request.get("id", idx)
            user_preferences = request.get("preferences", {})

            if not destination or days <= 0:
                print(f"⚠️ Skipping invalid request at index {idx}: {request}")
                continue

            try:
                print(f"\n{'='*60}")
                print(f"📍 Request {idx}: {destination} ({days} days)")
                print(f"👤 Gender: {gender}")
                print(f"{'='*60}")

                # Generate packing list with retries
                packing_list = None
                for attempt in range(3):
                    packing_list = self.generate_packing_list(
                        destination, days, gender, user_preferences
                    )
                    if packing_list:
                        break
                    if attempt < 2:
                        print(f"⏳ Retry {attempt + 1}/2...")
                        time.sleep(2)

                if not packing_list:
                    print(f"❌ Skipped {destination} (generation failed after 3 attempts)")
                    continue

                # Clean the content
                print(f"🧹 Cleaning packing list content...")
                cleaned = self.clean_packing_content(packing_list)

                # Store result
                result = {
                    "id": request_id,
                    "destination": destination,
                    "days": days,
                    "gender": gender,
                    "packing_list": cleaned,
                    "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                }

                results.append(result)
                self.successful_generations += 1

                print(f"✅ Packing list saved for {destination}")
                print(f"📊 List length: {len(cleaned)} characters")

                # Rate limiting
                if idx < len(requests_list):
                    time.sleep(1)

            except Exception as e:
                print(f"❌ Error processing {destination}: {e}")
                continue

        # Save all results
        self.save_results(results)

    def save_results(self, results: List[Dict]):
        """Save results to output JSON file"""

        try:
            with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as outfile:
                json.dump(results, outfile, ensure_ascii=False, indent=2)

            print(f"\n{'='*60}")
            print(f"✅ All results saved to '{OUTPUT_JSON_FILE}'")
            print(f"📊 Total generated: {self.successful_generations}/{len(results)}")
            print(f"🔌 API calls made: {self.api_calls}")
            print(f"{'='*60}")

        except Exception as e:
            print(f"❌ Failed to write {OUTPUT_JSON_FILE}: {e}")

    def create_example_input(self):
        """Create an example input.json file"""

        example_data = [
            {
                "id": 1,
                "destination": "Goa",
                "days": 5,
                "gender": "female",
                "preferences": {"activity_level": "moderate", "budget": "standard"},
            },
            {
                "id": 2,
                "destination": "Kashmir",
                "days": 7,
                "gender": "male",
                "preferences": {"activity_level": "high", "budget": "premium"},
            },
            {
                "id": 3,
                "destination": "Himachal Pradesh",
                "days": 10,
                "gender": "female",
                "preferences": {"activity_level": "high", "budget": "budget"},
            },
        ]

        try:
            with open(INPUT_JSON_FILE, "w", encoding="utf-8") as f:
                json.dump(example_data, f, ensure_ascii=False, indent=2)
            print(f"✅ Example '{INPUT_JSON_FILE}' created. Edit it and run again!")
        except Exception as e:
            print(f"❌ Failed to create example file: {e}")


def main():
    """Main entry point"""
    print("\n" + "=" * 60)
    print("🎒 MUMMY Packing List Generator")
    print("=" * 60 + "\n")

    generator = PackingListGenerator()
    generator.process_packing_requests()


if __name__ == "__main__":
    main()
